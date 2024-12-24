import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MainContext } from "../../../context/main.context";
import { getAllColorAPI } from "../../../services/product.api";
import { addNewProductAPI } from "../../../services/admin.api";
export default function AddColorProduct() {
  const { categories } = useContext(MainContext);
  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState("");
  const [quantity_sizes, setQuantity_sizes] = useState([
    { size: "M", quantity: 1 },
    { size: "L", quantity: 1 },
    { size: "XL", quantity: 1 },
    { size: "2XL", quantity: 1 },
  ]);
  const [color, setColor] = useState(1);
  const [listColor, setListColor] = useState([]);
  useEffect(() => {
    getColor();
  }, []);
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImage(null);
      setPreview("");
      return;
    }

    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const addNewProuduct = () => {
    quantity_sizes.forEach(async (size, index) => {
      const formData = new FormData();
      formData.append("name", "");
      formData.append("image", index === 0 ? image : "");
      formData.append("price", "");
      formData.append("sale", "");
      formData.append("category_name", "");
      formData.append("quantity", size.quantity);
      formData.append("color_name", listColor[color].name);
      formData.append("hex_code", listColor[color].hex_code);
      formData.append("size_name", "");
      try {
        const res = await addNewProductAPI(formData);
        console.log("Product added successfully:", res);
      } catch (error) {
        console.error("Hình như có lỗi xảy ra: ", error);
      }
    });
  };
  const getColor = async () => {
    const res = await getAllColorAPI();
    const data = await res.data.data;
    setListColor(data);
  };
  return (
    <div id="add-product">
      <div className="left">
        <label
          className=""
          htmlFor="input-img"
          style={{
            height: "500px",
            borderRadius: "20px",
            padding: "15px",
            border: "2px dashed var(--accent-color)",
            animation: "blinkingBackground 5s infinite",
          }}
        >
          {preview ? (
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={preview}
            ></img>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                fontSize: "20px",
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Hình ảnh sản phẩm
            </div>
          )}
        </label>
        <input
          id="input-img"
          type="file"
          onChange={(e) => handleOnChangeFile(e)}
          style={{ display: "none" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="right">
          <div className="container-input-category">
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>Màu:</div>
              <select value={color} onChange={(e) => setColor(e.target.value)}>
                {listColor.map((color, index) => {
                  return (
                    <option key={color.hex_code} value={index}>
                      {color.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {quantity_sizes.map((size, index) => {
            return (
              <div className="container-input-size">
                <div className="container-input">
                  <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                    Kích thước {size.size}:
                  </div>
                </div>
                <div className="container-input">
                  <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                    Số lượng:
                  </div>
                  <input
                    value={size.quantity}
                    onChange={(e) =>
                      setQuantity_sizes((prev) => {
                        const newL = [...prev];
                        newL[index].quantity = e.target.value;
                        return newL;
                      })
                    }
                    placeholder="Nhập tên sản phẩm"
                    style={{ width: "100%" }}
                  ></input>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn10"
          onClick={addNewProuduct}
          style={{ borderRadius: "10px", padding: "15px" }}
        >
          Thêm sản phẩm
        </button>
      </div>
    </div>
  );
}
