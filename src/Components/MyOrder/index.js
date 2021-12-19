import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import "../../styles.css";
import emailjs from "emailjs-com";
import { app } from "../../firebaseConfig";
import Modal from "./modal";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
const MyOrders = () => {
    const customer = useSelector((state) => state.user);
    const [data, setData] = useState(null);
    const [dataModal, setDataModal] = useState(null);
    const history = useHistory();
    console.log(customer);
    const db_Transactions = app
        .database()
        .ref()
        .child(`/transactions`)
        .orderByChild("customerId")
        .equalTo(customer.currentUser.customerId);
    useEffect(() => {
        if (!customer.currentUser.customerId) {
            history.push("/login");
        }
        db_Transactions.once("value", function (snap) {
            if (snap.val()) {
                setData(Object.values(snap.val()));
            }
        });
    }, []);
    const renderStatus = (status) => {
        let returnVal = "";
        switch (status) {
            case "pending":
                returnVal = "Chờ xử lý";
                break;
            case "driverPending":
                returnVal = "Chờ xử lý";
                break;
            case "inProgress":
                returnVal = "Đang giao";
                break;
            case "completed":
                returnVal = "Đã hoàn tất";
                break;
            case "canceled":
                returnVal = "Đã hủy";
                break;
            default:
                break;
        }
        return returnVal;
    };
    const handleCanel = (id) => {
        if (confirm("Xác nhận hủy?")) {
            const db_Transactions = app
                .database()
                .ref()
                .child(`/transactions/${id}`);
            db_Transactions
                .update({
                    status: "canceled",
                })
                .then(() => {
                    const newData = data.map((item) => {
                        if (item.transactionId === id) {
                            return { ...item, status: "canceled" };
                        }
                        return item;
                    });
                    setData(newData);
                });
        }
    };

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
                            <tr className="text-center">
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
                                            : val.status === "completed"
                                            ? "badge-success"
                                            : "badge-danger";
                                    return (
                                        <tr className="text-center" key={index}>
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
                                                    {renderStatus(val.status)}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                {val.status === "pending" && (
                                                    <button
                                                        class={`btn btn-danger mr-1`}
                                                        onClick={() =>
                                                            handleCanel(
                                                                val?.transactionId
                                                            )
                                                        }
                                                    >
                                                        Hủy bỏ
                                                    </button>
                                                )}
                                                <button
                                                    class={`btn btn-primary`}
                                                    onClick={() => {
                                                        setDataModal(val);
                                                    }}
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
            {dataModal && (
                <Modal
                    transaction={dataModal}
                    onClose={() => {
                        setDataModal(null);
                    }}
                />
            )}
        </>
    );
};
export default MyOrders;
