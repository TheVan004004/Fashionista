import React, { useEffect, useState } from "react";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { getProductsAPI } from "../../services/product.api";
import { updateProductAPI } from "../../services/admin.api";
export default function ProductManage() {
  const [listProducts, setListProducts] = useState([]);
  const [listProductsCache, setListProductsCache] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = async () => {
    const res = await getProductsAPI({ limit: 1000, page: 1 });
    const data = res.data.data;
    setListProducts(data);
    setListProductsCache(data);
  };

  const handleSave = async () => {
    console.log("check");
    setIsSaving(true);
    let isChange = false;
    try {
      for (let index = 0; index < listProductsCache.length; index++) {
        if (
          listProductsCache?.[index].name !== listProducts?.[index].name ||
          listProductsCache?.[index].sale !== listProducts?.[index].sale ||
          listProductsCache?.[index].price !== listProducts?.[index].price
        ) {
          await updateProductAPI({
            product_id: listProductsCache[index].id,
            newName: listProductsCache[index].name,
            newPrice: listProductsCache[index].price,
            newSale: listProductsCache[index].sale,
          });
          isChange = true;
        }
      }
      if (isChange) getAllProduct();
    } catch (e) {
      console.log(e);
    }

    setIsSaving(false);
    setIsEdit(false);
  };
  const onChangeDataInCache = (newProduct, index) => {
    setListProductsCache((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newProduct,
      };
      return newList;
    });
  };
  return (
    <>
      <h2>Product:</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <button
            className={isEdit ? "active" : ""}
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </button>
          <button onClick={handleSave}>Lưu thay đổi</button>
        </div>

        <button>Thêm sản phẩm mới</button>
      </div>

      <table style={{ marginTop: "10px", position: "relative" }}>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th style={{ width: "120px" }}>Loại</th>
            <th style={{ width: "120px" }}>Giá (VNĐ)</th>
            <th style={{ width: "100px" }}>Giảm giá</th>
            <th style={{ width: "140px" }}>Tổng lượt mua</th>
            <th style={{ width: "120px" }}></th>
          </tr>
        </thead>
        <tbody>
          {listProductsCache?.map((product, index) => {
            return (
              <tr className={product?.status === "delete" ? "pre_delete" : ""}>
                <td>
                  <input
                    value={product.name}
                    onChange={(e) =>
                      onChangeDataInCache(
                        {
                          ...product,
                          name: e.target.value,
                        },
                        index
                      )
                    }
                  ></input>
                </td>
                <td>{product.category_name}</td>
                <td style={{ textAlign: "center" }}>
                  <input
                    style={{ textAlign: "center" }}
                    value={product.price}
                    onChange={(e) =>
                      onChangeDataInCache(
                        {
                          ...product,
                          price: e.target.value,
                        },
                        index
                      )
                    }
                  ></input>
                </td>
                <td style={{ textAlign: "center" }}>
                  <select
                    value={product.sale}
                    onChange={(e) =>
                      onChangeDataInCache(
                        {
                          ...product,
                          sale: e.target.value,
                        },
                        index
                      )
                    }
                  >
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
                </td>
                <td style={{ textAlign: "center" }}>{product.total_buyturn}</td>
                <td className="action">
                  <HiPencilAlt className="icon edit" />
                </td>
              </tr>
            );
          })}
        </tbody>
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: !isEdit ? "10" : "-10",
            backgroundColor: "white",
            opacity: "20%",
            cursor: "not-allowed",
          }}
        ></div>
      </table>
    </>
  );
}
