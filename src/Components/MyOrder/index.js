import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import "../../styles.css";
import emailjs from "emailjs-com";
import { app } from "../../firebaseConfig";
import Modal from './modal'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
const MyOrders = () => {
    const customer = useSelector((state) => state.user);
    const [data, setData] = useState(null);
    const [dataModal, setDataModal] = useState(null);
    const history = useHistory();
    const db_Transactions = app.database().ref().child(`/system/transactions/`);

    useEffect(() => {
        if (!customer.currentUser.customerId) {
            history.push("/login");
        }
        db_Transactions.once("value", function (snap) {
            console.log(snap.val());
            const result = [];
            if (snap.val()) {
                Object.values(snap.val()).forEach((parent) => {
                    Object.values(parent).forEach((child) => {
                        if (
                            child.customerId === customer.currentUser.customerId
                        ) {
                            result.push(child);
                        }
                    });
                    if (result.length) {
                        setData(result);
                    }
                });
            }
        });
    }, [customer]);

    return (
        <>
            <section
                className="navbar_sect"
                style={{ backgroundImage: "url(/images/bg5.jpg)" }}
            >
                <div className="contact_sect">
                    <div className="container-fluid">
                        <div className="inner_container">
                            <h1>VẬN CHUYỂN HÀNG</h1>
                            <p>
                                <Link to="/home">Trang chủ</Link>
                                &ensp;/&ensp;Đơn hàng của tôi
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="contact-sect" style={{ padding: "60px 0" }}>
                <div class="container">
                    <table class="his-orders table table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">STT</th>
                                <th scope="col">Ngày tạo</th>
                                <th scope="col">Mã đơn hàng</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((val, index) => {
                                    const className =
                                        val.status === "pending"
                                            ? "badge-warning"
                                            : val.status === "inProgress"
                                            ? "badge-primary"
                                            : "badge-success";
                                    const status =
                                        val.status === "pending"
                                            ? "Chờ xử lý"
                                            : val.status === "inProgress"
                                            ? "Đang chuyển"
                                            : "Đã hoàn thành";

                                    return (
                                        <tr className='text-center' key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{val.initialTime}</td>
                                            <td>{val.transportCode}</td>
                                            <td>
                                                {
                                                    val.shippingInfo.productInfo
                                                        .productName
                                                }
                                            </td>
                                            <td>
                                                <span
                                                    class={`badge ${className}`}
                                                >
                                                    {status}
                                                </span>
                                            </td>
                                            <td className='text-center'>
                                                {val.status === "pending" && (
                                                    <button
                                                        class={`btn btn-danger mr-1`}
                                                    >
                                                        Hủy bỏ
                                                    </button>
                                                )}
                                                <button
                                                    class={`btn btn-primary`}
                                                    onClick={()=>{setDataModal(val)}}
                                                >
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                           
                        </tbody>
                    </table>
                </div>
            </section>
            {dataModal && <Modal transaction={dataModal} onClose={()=>{setDataModal(null)}}/>}
        </>
    );
};
export default MyOrders;
