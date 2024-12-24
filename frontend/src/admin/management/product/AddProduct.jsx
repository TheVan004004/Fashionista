import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MainContext } from "../../../context/main.context";
import {
  getAllColorAPI,
  getProductByNameAPI,
} from "../../../services/product.api";
import { addNewProductAPI } from "../../../services/admin.api";
import { HiXCircle } from "react-icons/hi";
import { toast } from "react-toastify";
export default function AddProduct({
  setProductView,
  productView,
  getProduct,
  listProductDetail,
}) {
  const { categories, getAllCategory } = useContext(MainContext);
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
    { size: "2XL", quantity: 1 },
  ]);
  const [color, setColor] = useState(1);
  const [listColor, setListColor] = useState([]);
  useEffect(() => {
    getColorDetail();
  }, [productView, listProductDetail]);
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
  const addNewProuduct = async () => {
    const formData = new FormData();
    if (listProductDetail.length >= 2) {
      formData.append("name", productView.name);
      formData.append("price", productView.price);
      formData.append("sale", productView.sale);
      formData.append(
        "category_name",
        otherCategory === "" ? category : otherCategory
      );
    } else {
      formData.append("name", name);
      formData.append("price", price);
      formData.append("sale", sale);
      formData.append(
        "category_name",
        otherCategory === "" ? category : otherCategory
      );
    }
    formData.append("image", image);
    formData.append(
      "color_name",
      otherColorName === "" ? listColor[color].name : otherColorName
    );
    formData.append(
      "hex_code",
      otherColorHexcode === "" ? listColor[color].hex_code : otherColorHexcode
    );
    quantity_sizes.forEach((size, index) => {
      formData.append(`quantity_size${size.size}`, size.quantity);
    });
    try {
      const res = await addNewProductAPI(formData);

      if (!res || !res.data) {
        console.error("API response is invalid:", res);
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (res.data.errorCount === 1) {
        toast.error(res.data.message);
        return;
      }
      setProductView(res?.data?.data);
      getAllCategory();
      getProduct();
      console.log("Product added successfully:", res);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const getColorDetail = async () => {
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
          {listProductDetail.length < 2 ? (
            <>
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
                  <select
                    value={sale}
                    onChange={(e) => setSale(e.target.value)}
                  >
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
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
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
                  <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                    Màu:
                  </div>
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
            </>
          ) : (
            <>
              <div className="container-input">
                <div style={{ flexShrink: "0", whiteSpace: "nowrap" }}>
                  Màu:
                </div>
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
                        style={{ height: "45px", width: "150px" }}
                        placeholder="Nhập màu"
                        value={otherColorName}
                        onChange={(e) => setOtherColorName(e.target.value)}
                      />
                      <input
                        style={{ height: "45px", width: "150px" }}
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
                    style={{ height: "45px", width: "300px" }}
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
            </>
          )}

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
