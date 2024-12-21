import React, { useEffect, useState } from "react";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { getProductsAPI } from "../../services/product.api";
import { updateProductAPI } from "../../services/admin.api";
export default function ProductManage2() {
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
      <section class="wrapper">
        <main class="row title">
          <ul>
            <li>Sport</li>
            <li>Entry $</li>
            <li>
              <span class="title-hide">#</span> Entries
            </li>
            <li>Max</li>
            <li>Time</li>
          </ul>
        </main>
        <section class="row-fadeIn-wrapper">
          <article class="row fadeIn nfl">
            <ul>
              <li>
                <a href="#">NFL</a>
                <span class="small">(fadeIn)</span>
              </li>
              <li>$50</li>
              <li>12</li>
              <li>48</li>
              <li>2:00ET</li>
            </ul>
            <ul class="more-content">
              <li>
                This 1665-player contest boasts a $300,000.00 prize pool and
                pays out the top 300 finishing positions. First place wins
                $100,000.00. Good luck!
              </li>
            </ul>
          </article>
        </section>
        <section class="row-fadeOut-wrapper">
          <article class="row nfl">
            <ul>
              <li>
                <a href="#">NFL</a>
                <span class="small">(fadeOut)</span>
              </li>
              <li>$5</li>
              <li>45</li>
              <li>100</li>
              <li>3:00ET</li>
            </ul>
            <ul class="more-content">
              <li>
                This 1665-player contest boasts a $300,000.00 prize pool and
                pays out the top 300 finishing positions. First place wins
                $100,000.00. Good luck!
              </li>
            </ul>
          </article>
        </section>
        <article class="row nfl">
          <ul>
            <li>
              <a href="#">NHL</a>
            </li>
            <li>$50</li>
            <li>12</li>
            <li>48</li>
            <li>12:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row mlb update-row">
          <ul>
            <li>
              <a href="#">MLB</a>
              <span class="small">(update)</span>
            </li>
            <li>$10</li>
            <li>
              <span class="update1">1</span>
              <span class="update2">2</span>
            </li>
            <li>10</li>
            <li>1:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row mlb">
          <ul>
            <li>
              <a href="#">MLB</a>
            </li>
            <li>$5</li>
            <li>48</li>
            <li>120</li>
            <li>12:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row nhl">
          <ul>
            <li>
              <a href="#">NHL</a>
            </li>
            <li>$50</li>
            <li>12</li>
            <li>48</li>
            <li>12:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row nhl">
          <ul>
            <li>
              <a href="#">NHL</a>
            </li>
            <li>$50</li>
            <li>12</li>
            <li>48</li>
            <li>12:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row pga">
          <ul>
            <li>
              <a href="#">PGA</a>
            </li>
            <li>$50</li>
            <li>12</li>
            <li>48</li>
            <li>11:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row pga">
          <ul>
            <li>
              <a href="#">PGA</a>
            </li>
            <li>$50</li>
            <li>12</li>
            <li>48</li>
            <li>11:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row pga">
          <ul>
            <li>
              <a href="#">PGA</a>
            </li>
            <li>$50</li>
            <li>12</li>
            <li>48</li>
            <li>11:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
        <article class="row mlb">
          <ul>
            <li>
              <a href="#">MLB</a>
            </li>
            <li>$10</li>
            <li>1</li>
            <li>10</li>
            <li>1:00ET</li>
          </ul>
          <ul class="more-content">
            <li>
              This 1665-player contest boasts a $300,000.00 prize pool and pays
              out the top 300 finishing positions. First place wins $100,000.00.
              Good luck!
            </li>
          </ul>
        </article>
      </section>
    </>
  );
}
