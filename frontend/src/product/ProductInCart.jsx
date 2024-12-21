import React, { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { deleteItemInCartAPI, updateItemCartAPI } from "../services/cart.api";
import { toast } from "react-toastify";
import { getProductByNameAPI } from "../services/product.api";

export default function ({
  product,
  setListOrder,
  index,
  setListProductInCart,
  getCart,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [colors, setColors] = useState([]);
  const sizes = ["M", "L", "XL"];
  const [colorChange, setColorChange] = useState(product.hex_code);
  const [sizeChange, setSizeChange] = useState(product.size_name);
  const deleteItemInCart = async () => {
    try {
      await deleteItemInCartAPI(product.item_id);
      setListProductInCart((prev) =>
        prev.filter((p) => p.item_id !== product.item_id)
      );
      setListOrder((prev) => prev.filter((p) => p.item_id !== product.item_id));
      toast.success(`Đã xoá ${product.name} ra khỏi giỏ hàng`);
    } catch (e) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
  };
  useEffect(() => {
    getInfor();
  }, []);
  const getInfor = async () => {
    const res = await getProductByNameAPI(product.name);
    const data = res.data.data;
    setColors(data[0].color);
  };
  const updateProductInCart = async () => {
    await updateItemCartAPI({
      item_id: product.item_id,
      color: colorChange,
      size: sizeChange,
      quantity: product.quantity_item,
    });
    getCart();
    setIsEdit(false);
  };
  const updateQuantity = async (option) => {
    if (option === "minus" && product.quantity_item === 1) return;
    await updateItemCartAPI({
      item_id: product.item_id,
      color: product.hex_code,
      size: product.size_name,
      quantity:
        option === "add"
          ? product.quantity_item + 1
          : product.quantity_item - 1,
    });
    getCart();
  };
  return (
    <div className="product">
      <input
        checked={product.checked}
        type="checkbox"
        id={`${product.id}`}
        style={{ flexShrink: "0" }}
        onChange={(e) => {
          setListProductInCart((prev) => {
            const newL = [...prev];
            newL[index].checked = e.target.checked;
            return newL;
          });
          if (e.target.checked) {
            setListOrder((prev) => [...prev, product]);
          } else {
            setListOrder((prev) =>
              prev.filter(
                (p) => p.product_details_id !== product.product_details_id
              )
            );
          }
        }}
      />
      <div className="container-product">
        <img
          style={{ height: "150px", width: "120px", objectFit: "cover" }}
          src={product.image}
        ></img>
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {product.name}
            </p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "400",
                color: "var(--sale-color)",
              }}
            >
              {((product.price * (100 - product.sale)) / 100).toLocaleString(
                "vi-VN"
              )}
              đ
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: "5px 10px ",
                  backgroundColor: "var(--accent-color)",
                  borderRadius: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setIsEdit((prev) => !prev)}
              >
                {product.color_name}, {product.size_name}
              </div>
              {isEdit && (
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#0000008f",
                    position: "absolute",
                    top: "35px",
                    display: "flex",
                    gap: "10px",
                    borderRadius: "10px",
                    color: "white",
                  }}
                >
                  <select
                    style={{
                      color: "white",
                      width: "100px",
                    }}
                    value={colorChange}
                    onChange={(e) => setColorChange(e.target.value)}
                  >
                    {colors.map((color, index) => {
                      return (
                        <option value={color.hex_code} key={index}>
                          {color.color_name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    style={{
                      color: "white",
                      width: "50px",
                    }}
                    value={sizeChange}
                    onChange={(e) => setSizeChange(e.target.value)}
                  >
                    {sizes.map((size, index) => (
                      <option value={size} key={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{
                      width: "100px",
                      padding: "5px 10px",
                      backgroundColor: "var(--blur-color)",
                      borderRadius: "10px",
                      color: "white",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                    onClick={updateProductInCart}
                  >
                    Thay đổi
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px 10px",
              }}
            >
              <div
                style={{
                  width: "70px",
                  display: "flex",
                  gap: "15px",
                  justifyContent: "space-between",
                }}
              >
                <div onClick={() => updateQuantity("minus")}>-</div>
                <p>{product.quantity_item}</p>
                <div onClick={() => updateQuantity("add")}>+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
        }}
      >
        <button onClick={deleteItemInCart}>
          <HiOutlineX />
        </button>
      </div>
    </div>
  );
}
