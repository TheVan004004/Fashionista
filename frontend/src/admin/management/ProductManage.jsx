import React, { useEffect, useState } from "react";
import { getAllProductsAPI } from "../../services/services";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
export default function ProductManage() {
  const [listProducts, setListProducts] = useState([]);
  const [listProductsCache, setListProductsCache] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = async () => {
    const res = await getAllProductsAPI();
    console.log(res.data);
    setListProducts(res.data);
    setListProductsCache(res.data);
  };
  const toogleStateProductInCache = (index) => {
    setListProductsCache((prev) => {
      const newList = [...prev];
      if (newList[index]?.status === "delete") {
        newList[index] = {
          ...prev[index],
          status: undefined,
        };
        return newList;
      }

      newList[index] = {
        ...prev[index],
        status: "delete",
      };
      return newList;
    });
  };
  const handleSave = async () => {
    setIsSaving(true);
    let isChange = false;
    try {
      //   for (let index = 0; index < listProductsCache.length; index++) {
      //     if (listProductsCache?.[index]?.status === "delete") {
      //       await deleteProductAPI(listProductsCache?.[index].id);
      //       isChange = true;
      //       continue;
      //     }
      //     // if (
      //     //   listProductsCache?.[index].name !== listProducts?.[index].name ||
      //     //   listProductsCache?.[index].discount !==
      //     //     listProducts?.[index].discount ||
      //     //   listProductsCache?.[index].price !== listProducts?.[index].price
      //     // ) {
      //     //   await updateProductAPI({
      //     //     product_id: listProductsCache?.[index].id,
      //     //     name: listProductsCache?.[index].name,
      //     //     price: listProductsCache?.[index].price,
      //     //     discount: listProductsCache?.[index].discount,
      //     //   });
      //     //   isChange = true;
      //     // }
      //   }
      //   if (isChange) getProducts();
    } catch (e) {
      console.log(e);
    }

    setIsSaving(false);
    setIsEdit(false);
  };
  console.log(listProductsCache);
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
          <button onClick={() => setIsEdit(false)}>Lưu thay đổi</button>
        </div>

        <button>Thêm sản phẩm mới</button>
      </div>

      <table style={{ marginTop: "10px", position: "relative" }}>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Loại</th>
            <th>Giá (VNĐ)</th>
            <th>Giảm giá</th>
            <th>Tổng lượt mua</th>
            <th>Tồn kho</th>
            <th style={{ width: "60px" }}></th>
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
                <td style={{ width: "100px" }}>{product.category_name}</td>
                <td style={{ width: "100px" }}>
                  <input
                    value={product.price * 1000}
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
                <td style={{ width: "80px", textAlign: "center" }}>
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
                    <option value={0.1}>10%</option>
                    <option value={0.2}>20%</option>
                    <option value={0.3}>30%</option>
                    <option value={0.4}>40%</option>
                    <option value={0.5}>50%</option>
                    <option value={0.6}>60%</option>
                    <option value={0.7}>70%</option>
                    <option value={0.8}>80%</option>
                    <option value={0.9}>90%</option>
                  </select>
                </td>
                <td style={{ width: "120px", textAlign: "center" }}>
                  {product.total_buyturn}
                </td>
                <td style={{ width: "120px", textAlign: "center" }}>
                  {product.quantity}
                </td>
                <td className="action">
                  <HiPencilAlt className="icon edit" />
                  <HiOutlineTrash
                    className="icon remove"
                    onClick={() => toogleStateProductInCache(index)}
                  />
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
