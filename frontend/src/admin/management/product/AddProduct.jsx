import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MainContext } from "../../../context/main.context";
import { getAllColorAPI } from "../../../services/product.api";
import { addNewProductAPI } from "../../../services/admin.api";
import { HiXCircle } from "react-icons/hi";
export default function AddProduct() {
  const { categories } = useContext(MainContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState("");
  const [price, setPrice] = useState(0);
  const [sale, setSale] = useState(0);
  const [category, setCategory] = useState("Áo Phông");
  const [otherCategory, setOtherCategory] = useState("");
  const [otherColorName, setOtherColorName] = useState("");
  const [otherColorHexcode, setOtherColorHexcode] = useState("");
  const [quantity_sizes, setQuantity_sizes] = useState([
    { size: "M", quantity: 1 },
    { size: "L", quantity: 1 },
    { size: "XL", quantity: 1 },
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
      formData.append("name", name);
      formData.append("image", index === 0 ? image : "");
      formData.append("price", index === 0 ? price : "");
      formData.append("sale", index === 0 ? sale : "");
      formData.append(
        "category_name",
        otherCategory === "" ? category : otherCategory
      );
      formData.append("quantity", size.quantity);
      formData.append(
        "color_name",
        otherColorName === "" ? listColor[color].name : otherColorName
      );
      formData.append(
        "hex_code",
        otherColorHexcode === "" ? listColor[color].hex_code : otherColorHexcode
      );
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
  console.log(otherColorHexcode);
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
          <div className="container-input">
            <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
              Tên sản phẩm:
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
              style={{ width: "100%", padding: "15px" }}
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
                <option value={0}>Không</option>
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
          <div
            className="container-input-category"
            style={{
              gridTemplateColumns:
                color === "Other" ? "1.2fr 1.5fr" : "1fr 1fr",
            }}
          >
            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                Loại :
              </div>
              {category === "Other" ? (
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <input
                    style={{ height: "45px" }}
                    placeholder="Nhập loại sản phẩm"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                  />
                  <HiXCircle
                    style={{ fontSize: "30px", color: "var(--sale-color)" }}
                    onClick={() => {
                      setCategory("Áo Phông");
                      setOtherCategory("");
                    }}
                  />
                </div>
              ) : (
                <>
                  <select
                    style={{ height: "45px" }}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((category, index) => {
                      return (
                        <option
                          key={index + category.name}
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      );
                    })}
                    <option value={"Other"}>Khác</option>
                  </select>
                </>
              )}
            </div>

            <div className="container-input">
              <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>Màu:</div>
              {color === "Other" ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      style={{ height: "45px" }}
                      placeholder="Nhập màu"
                      value={otherColorName}
                      onChange={(e) => setOtherColorName(e.target.value)}
                    />
                    <input
                      style={{ height: "45px" }}
                      type="color"
                      id="color"
                      placeholder="Mã màu"
                      value={otherColorHexcode}
                      onChange={(e) => setOtherColorHexcode(e.target.value)}
                    />
                    <HiXCircle
                      style={{
                        fontSize: "30px",
                        color: "var(--sale-color)",
                        flexShrink: "0",
                      }}
                      onClick={() => {
                        setColor(1);
                        setOtherColorName("");
                        setOtherColorHexcode("");
                      }}
                    />
                  </div>
                </>
              ) : (
                <select
                  style={{ height: "45px" }}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  {listColor.map((color, index) => {
                    return (
                      <option key={color.hex_code} value={index}>
                        {color.name}
                      </option>
                    );
                  })}
                  <option value={"Other"}>Khác</option>
                </select>
              )}
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
