import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MainContext } from "../../../context/main.context";
import { getAllColorAPI } from "../../../services/product.api";
import { addNewProductAPI } from "../../../services/admin.api";
export default function AddProduct() {
  const { categories } = useContext(MainContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState("");
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity_sizes, setQuantity_sizes] = useState([
    { size: "M", quantity: 1 },
    { size: "L", quantity: 1 },
    { size: "XL", quantity: 1 },
  ]);
  const [color, setColor] = useState("");
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
      formData.append("name", name);
      formData.append("image", index === 0 ? image : "");
      formData.append("price", index === 0 ? price : "");
      formData.append("sale", index === 0 ? sale : "");
      formData.append("category_name", category);
      formData.append("quantity", size.quantity);
      formData.append("color_name", listColor[color].name);
      formData.append("hex_code", listColor[color].hex_code);
      formData.append("size_name", size.size);
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
        <a className="">
          {preview && (
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={preview}
            ></img>
          )}
        </a>
        <label htmlFor="input-img" className="btn10">
          Tải lên ảnh
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
          <div className="container-input">
            <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
              Tên sản phẩm:
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              style={{ width: "100%" }}
            ></input>
          </div>
          <div className="container-input-price">
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Giá bán:
              </div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Nhập tên sản phẩm"
                style={{ width: "100%" }}
              ></input>
            </div>
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Giảm giá
              </div>
              <select value={sale} onChange={(e) => setSale(e.target.value)}>
                <option value={10}>10%</option>
                <option value={20}>20%</option>
                <option value={30}>30%</option>
                <option value={40}>40%</option>
                <option value={50}>50%</option>
                <option value={60}>60%</option>
                <option value={70}>70%</option>
                <option value={80}>80%</option>
                <option value={90}>90%</option>
              </select>
            </div>
          </div>
          <div className="container-input-category">
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Loại sản phẩm:
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((category, index) => {
                  return (
                    <option key={index + category.name} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
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
        <button className="btn10" onClick={addNewProuduct}>
          Thêm sản phẩm
        </button>
      </div>
    </div>
  );
}
