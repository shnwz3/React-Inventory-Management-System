import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  // Fetching Data of All Purchase items
  const fetchPurchaseData = () => {
    fetch(`http://localhost:4000/api/purchase/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  
  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center ">
      <div className=" flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext = {authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Purchase Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Purchase
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity Purchased
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Purchase Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {purchase.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.ProductID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.QuantityPurchased}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(element.PurchaseDate).toLocaleDateString() ==
                      new Date().toLocaleDateString()
                        ? "Today"
                        : element.PurchaseDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      ${element.TotalPurchaseAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Products to Import Section */}
        <div className="my-8 mx-5">
          <h3 className="font-bold text-lg pl-5">Products to Import</h3>
          <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Product Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Stock Duration limit
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Inventory Level
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Desired inventory level
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* {productsToImport.map((product, index) => {
                  const stockDuration = Math.floor(product.inventoryLevel / product.demandForecast); */}
                  {/* return ( */}
                    {/* <tr key={product._id}> */}<tr>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                        {/* {product.name} */}  mangos
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {/* {product.category} */}5 days
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {/* {product.inventoryLevel} */}500
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {/* {stockDuration} weeks */}1500
                      </td>
                    </tr>

                      
                  {/* ); */}
                {/* })} */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products to Shutdown Section */}
        <div className="my-8 mx-5">
          <h3 className="font-bold text-lg pl-5">Products to Shutdown</h3>
          <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Product Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Inventory Level
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Last Imported Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* {productsToShutdown.map((product, index) => {
                  return ( */}
                    {/* <tr key={product._id}> */}<tr>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                        {/* {product.name} */}Aashirwaad atta
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {/* {product.category} */}Groceries
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {/* {product.inventoryLevel} */} 10
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {/* {new Date(product.lastImported).toLocaleDateString()} */}10/06/2024
                      </td>
                    </tr>
                  {/* );
                })} */}
              </tbody>
            </table>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;



