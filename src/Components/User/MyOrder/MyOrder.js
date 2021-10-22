import React, { useEffect, useState } from "react";

const MyOrder = (props) => {
  // const [allOrders, setAllOrders] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (props.authCtx.user !== null) {
      let orders = props.authCtx.user.orders;
      orders.sort((a, b) => {
        let nameA = a.courseName.toLowerCase();
        let nameB = b.courseName.toLowerCase();
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOrders(orders);
      // setAllOrders(orders);
    }
  }, [props.authCtx.user]);

  const getSortedData = () => {
    console.log("asdasdas", document.getElementById("order").value);
    if (document.getElementById("order").value === "category") {
      let ords = [...orders];
      ords.sort((a, b) => {
        let nameA = a.category.toLowerCase();
        let nameB = b.category.toLowerCase();
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOrders(ords);
    } else if (document.getElementById("order").value === "date") {
      let ords = [...orders];
      ords.sort((a, b) => {
        let nameA = a.courseBoughtTimestamp;
        let nameB = b.courseBoughtTimestamp;
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOrders(ords);
    } else if (document.getElementById("order").value === "course") {
      let ords = [...orders];
      ords.sort((a, b) => {
        let nameA = a.courseName.toLowerCase();
        let nameB = b.courseName.toLowerCase();
        // console.log(nameA, nameB);
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOrders(ords);
    }
  };

  let orderUi = null;
  if (orders !== null) {
    orderUi = orders.map((order) => {
      return (
        
        <tr key={order.orderId}>
          <td>{order.courseName}</td>
          <td>{order.category}</td>
          <td>{new Date(order.courseBoughtTimestamp).toLocaleString()}</td>
          <td>{order.status}</td>
          <td>
            <i class="fas fa-rupee-sign"></i>
            {order.price}
          </td>
          <td>
            <a href="#print" class="bill">
              Print Receipt
            </a>
          </td>
        </tr>
      );
    });
  }

  return (
    <div class="order">
      <div class="list-header">
        <h4>My Orders</h4>
        <div class="dropdown">
          <select
            name="order"
            id="order"
            class="dropdown-toggle"
            onChange={getSortedData}
          >
            <option class="list-item" value="course">
              Course Name
            </option>
            <option class="list-item" value="category">
              Category
            </option>
            <option class="list-item" value="date">
              Purchase Date
            </option>
          </select>
        </div>
      </div>
      <div class="order-details">
        <div class="scroll">
          <table class="table table-bordered">
            <thead>
              <tr>
                <td>Course Name</td>
                <td>Cateogry</td>
                <td>Purchase Date</td>
                <td>Status</td>
                <td>Total</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>{orderUi}</tbody>
            
          </table>
        </div>
      </div>
      <div class="end">No More Orders</div>
    </div>
  );
};

export default MyOrder;

// {/* <ul class="list dropdown">
//           <li class="dropdown-toggle" id="navbardrop" data-toggle="dropdown">
//             <span>Sort By</span>
//             <ul class="dropdown-menu">
//               <li>
//                 <a class="list-item">Course Name</a>
//               </li>
//               <li>
//                 <a class="list-item">Category</a>
//               </li>
//               <li>
//                 <a class="list-item">Purchase Date</a>
//               </li>
//               <li>
//                 <a class="list-item">Total Amount</a>
//               </li>
//             </ul>
//           </li>
//         </ul> */}
