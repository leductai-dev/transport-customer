import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Text, Image } from "rebass";
import { useFormik } from "formik";
import * as Yup from "yup";
import { app } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import {useSelector} from 'react-redux'
import { useHistory } from "react-router";

const Order = () => {
    const form = useRef();
    const [overlay, setOverlay] = useState(false);
    const [images, setImages] = React.useState([]);
    const customer = useSelector((state) => state.user);
    const history = useHistory()
    useEffect(() => {
        if(!customer.currentUser.customerId){
            history.push('/login')
        }
    }, [])
    // const db_Transactions = app.database().ref().child("/system/transactions/");
    // db_Transactions.on("value", (snap) => {
    //     console.log(snap.val());
    // });
    const showMapPicker = (add, lat, lng) => {
        const map = document.getElementById("modalMap");
        (map.style.visibility = "visible"), setOverlay(true);
        Array.from(
            document.getElementsByClassName("geocoder-control-input ")
        )[0].focus();
        document.getElementById("address").setAttribute("data-type", add);
        document.getElementById("lat").setAttribute("data-type", lat);
        document.getElementById("lng").setAttribute("data-type", lng);
    };
    const hideMapPicker = () => {
        const addElement = document.getElementById("address");
        const latElement = document.getElementById("lat");
        const longElement = document.getElementById("lng");
        if (addElement.value) {
            formik.setFieldValue(
                addElement.getAttribute("data-type"),
                addElement.value
            );
            formik.setFieldValue(
                latElement.getAttribute("data-type"),
                latElement.value
            );
            formik.setFieldValue(
                longElement.getAttribute("data-type"),
                longElement.value
            );
            addElement.value = "";
            latElement.value = "";
            longElement.value = "";
        }
        const map = document.getElementById("modalMap");
        (map.style.visibility = "hidden"), setOverlay(false);
    };
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    const formik = useFormik({
        initialValues: {
            senderName: "",
            senderPhone: "",
            receiverName: "",
            receiverPhone: "",
            fromAddress: "",
            toAddress: "",
            fromLat: "",
            toLat: "",
            fromLong: "",
            toLong: "",
            note: "",
            productName: "",
            weight: "",
            length: "",
            width: "",
            height: "",
        },
        validationSchema: Yup.object({
            senderName: Yup.string()
                .min(3, "Mininum 3 characters")
                .max(30, "Maximum 30 characters")
                .required("Required!"),
            senderPhone: Yup.string()
                .min(9, "Mininum 9 characters")
                .max(11, "Maximum 11 characters")
                .required("Required!"),
            receiverName: Yup.string()
                .min(3, "Mininum 4 characters")
                .max(15, "Maximum 30 characters")
                .required("Required!"),
            receiverPhone: Yup.string()
                .min(9, "Mininum 9 characters")
                .max(11, "Maximum 11 characters")
                .required("Required!"),
            fromAddress: Yup.string()
                .min(15, "Mininum 15 characters")
                .max(200, "Maximum 200 characters")
                .required("Required!"),
            toAddress: Yup.string()
                .min(15, "Mininum 8 characters")
                .max(200, "Maximum 200 characters")
                .required("Required!"),
            fromLat: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 15 characters")
                .required("Required!"),
            toLat: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 15 characters")
                .required("Required!"),
            fromLong: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 15 characters")
                .required("Required!"),
            toLong: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(20, "Maximum 15 characters")
                .required("Required!"),
            note: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 200 characters"),
            productName: Yup.string()
                .min(6, "Mininum 6 characters")
                .max(100, "Maximum 100 characters")
                .required("Required!"),
            weight: Yup.number()
                .min(0.1, "Mininum 1 characters")
                .max(10000, "Maximum 4 characters")
                .required("Required!"),
            length: Yup.number()
                .max(15, "Maximum 4 characters")
                .min(0.1, "Mininum 1 characters")
                .required("Required!"),
            width: Yup.number()
                .min(0.1, "Mininum 2 characters")
                .max(15, "Maximum 4 characters")
                .required("Required!"),
            height: Yup.number()
                .min(0.1, "Mininum 2 characters")
                .max(15, "Maximum 4 characters")
                .required("Required!"),
            imageUrl: Yup.string(),
            //         // .required("Required!")
        }),
        onSubmit: (values) => {
          
            const text = ["A","S","Q","T","P","N","T","H"];
            const transactionId = uuidv4();
            const transportCode = `${text[Math.floor(Math.random() * 8)]}${
                text[Math.floor(Math.random() * 8)]
            }-${Math.floor(Math.random() * 999 + 100)}-${Math.floor(
                Math.random() * 999 + 100
            )}`;
            const {
                senderName,
                senderPhone,
                receiverName,
                receiverPhone,
                fromAddress,
                toAddress,
                fromLat,
                toLat,
                fromLong,
                toLong,
                note,
                productName,
                weight,
                length,
                width,
                height,
            } = values;
            
            const db_Transactions = app
            .database()
            .ref()
            .child(`/system/transactions/pending/${transactionId}`);
            const promises = []
            images.forEach(image=>{
                promises.push(uploadPhoto(image.data_url))
            })
            Promise.all(promises).then((response) => {
                const imageUrl = response.map(res=>res.message).join(',')
                const transaction = {
                    transactionId,
                    transportCode,
                    customerId: customer.currentUser.customerId , 
                    initialTime: Date.now(),
                    note,
                    shippingInfo: {
                        sender: {
                            name: senderName,
                            phone: senderPhone,
                            address: fromAddress,
                            lat: fromLat,
                            long: fromLong,
                        },
                        receiver: {
                            name: receiverName,
                            phone: receiverPhone,
                            address: toAddress,
                            lat: toLat,
                            long: toLong,
                        },
                        productInfo: {
                            productName,
                            weight,
                            length,
                            width,
                            height,
                            imageUrl
                        },
                    },
                };
                db_Transactions.set(transaction);
                alert("Yêu cầu vận chuyển thành công!");  
            }).catch((errors)=>{
                alert("Có lỗi xảy ra! Vui lòng thử lại.");  
                throw errors 
            });
         
        },
    });

    const uploadPhoto = async (data) => {
        const _data = { value: data };
        return new Promise((resolve, reject) => {
            axios
                .post("http://localhost:2001/upload-image", _data)
                .then((res) => resolve(res.data))
                .catch((err) => reject(err));
        });
    };
    useEffect(() => {
        // app.database()
        //     .ref()
        //     .child("/")
        //     .on("value", (dataSnapshot) => {
        //         console.log(dataSnapshot);
        //         console.log("sdasdasd");
        //     });
        
    }, []);

    const { values, errors, handleSubmit, touched, handleChange } = formik;
    return (
        <>
            {/* section down where it should come */}
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
                                &ensp;/&ensp;Dịch vụ gửi hàng
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="contact-sect">
                <div class="container-fluid">
                    <div class="row m-0">
                        <div class="col-sm-6 col-lg-4">
                            <div class="contact_location">
                                <div class="icon">
                                    <img
                                        src="/images/cicon4.png"
                                        alt="Location Icon"
                                    />
                                </div>
                                <h4>Our Location</h4>
                                <p>
                                    Collin Street West, Victor 8007, Australia.
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="contact_location">
                                <div class="icon">
                                    <img
                                        src="/images/cicon2.png"
                                        alt="Call Icon"
                                    />
                                </div>
                                <h4>Make a Call</h4>
                                <p>
                                    Mobile:(+91)77889 90000
                                    <br />
                                    Mobile:(+91)55 114 252525
                                    <br />
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="contact_location">
                                <div class="icon">
                                    <img
                                        src="/images/cicon3.png"
                                        alt="Mail Icon"
                                    />
                                </div>
                                <h4>Write Some Words</h4>
                                <p>smartedu@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="row p-20 m-0">
                            <div class="form-grid col-md-6 col-lg-6 col-xl-6">
                                <form
                                    class="form-group"
                                    action="#"
                                    method="get"
                                    ref={form}
                                >
                                    <h3>Thông tin người gửi</h3>
                                    <label for="name">Người gửi</label>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            class="ipbox"
                                            id="name"
                                            name="senderName"
                                            value={values.senderName}
                                            onChange={handleChange}
                                        />
                                        {errors.senderName &&
                                            touched.senderName && (
                                                <p
                                                    className="position-absolute"
                                                    style={{
                                                        color: "red",
                                                        top: "40px",
                                                    }}
                                                >
                                                    {errors.senderName}
                                                </p>
                                            )}
                                    </div>

                                    <label for="mail">Số điện thoại</label>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            class="ipbox"
                                            id="mail"
                                            name="senderPhone"
                                            value={values.senderPhone}
                                            onChange={handleChange}
                                        />
                                        {errors.senderPhone &&
                                            touched.senderPhone && (
                                                <p
                                                    className="position-absolute"
                                                    style={{
                                                        color: "red",
                                                        top: "40px",
                                                    }}
                                                >
                                                    {errors.senderPhone}
                                                </p>
                                            )}
                                    </div>
                                    <label for="sub">Địa điểm gửi hàng</label>
                                    <div className="position-relative">
                                        <input
                                            onFocus={() => {
                                                showMapPicker(
                                                    "fromAddress",
                                                    "fromLat",
                                                    "fromLong"
                                                );
                                            }}
                                            type="text"
                                            class="ipbox"
                                            id="sub"
                                            name="fromAddress"
                                            value={values.fromAddress}
                                            onChange={handleChange}
                                        />
                                        {errors.fromAddress &&
                                            touched.fromAddress && (
                                                <p
                                                    className="position-absolute"
                                                    style={{
                                                        color: "red",
                                                        top: "40px",
                                                    }}
                                                >
                                                    {errors.fromAddress}
                                                </p>
                                            )}
                                    </div>
                                </form>
                            </div>
                            <div class="form-grid col-md-6 col-lg-6 col-xl-6">
                                <form
                                    class="form-group"
                                    action="#"
                                    method="get"
                                    ref={form}
                                >
                                    <h3>Thông tin người nhận</h3>
                                    <label for="name">Người nhận</label>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            class="ipbox"
                                            id="name"
                                            name="receiverName"
                                            value={values.receiverName}
                                            onChange={handleChange}
                                        />
                                        {errors.receiverName &&
                                            touched.receiverName && (
                                                <p
                                                    className="position-absolute"
                                                    style={{
                                                        color: "red",
                                                        top: "40px",
                                                    }}
                                                >
                                                    {errors.receiverName}
                                                </p>
                                            )}
                                    </div>

                                    <label for="mail">Số điện thoại</label>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            class="ipbox"
                                            id="mail"
                                            name="receiverPhone"
                                            value={values.receiverPhone}
                                            onChange={handleChange}
                                        />
                                        {errors.receiverPhone &&
                                            touched.receiverPhone && (
                                                <p
                                                    className="position-absolute"
                                                    style={{
                                                        color: "red",
                                                        top: "40px",
                                                    }}
                                                >
                                                    {errors.receiverPhone}
                                                </p>
                                            )}
                                    </div>

                                    <label for="sub">Nơi nhận hàng</label>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            class="ipbox"
                                            id="sub"
                                            name="toAddress"
                                            value={values.toAddress}
                                            onChange={handleChange}
                                            onFocus={() => {
                                                showMapPicker(
                                                    "toAddress",
                                                    "toLat",
                                                    "toLong"
                                                );
                                            }}
                                        />
                                        {errors.toAddress && touched.toAddress && (
                                            <p
                                                className="position-absolute"
                                                style={{
                                                    color: "red",
                                                    top: "40px",
                                                }}
                                            >
                                                {errors.toAddress}
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div class="form-grid col-md-6 col-lg-6 col-xl-6">
                                <form
                                    class="form-group"
                                    action="#"
                                    method="get"
                                    ref={form}
                                >
                                    <h3>Thông tin sản phẩm</h3>
                                    <label for="name">Tên sản phẩm</label>
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            class="ipbox"
                                            id="name"
                                            name="productName"
                                            value={values.productName}
                                            onChange={handleChange}
                                        />
                                        {errors.productName &&
                                            touched.productName && (
                                                <p
                                                    className="position-absolute"
                                                    style={{
                                                        color: "red",
                                                        top: "40px",
                                                    }}
                                                >
                                                    {errors.productName}
                                                </p>
                                            )}
                                    </div>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            mt: "30px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                pr: "5px",
                                                display: "flex",
                                                width: "50%",
                                                alignItems: "center",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    flexShrink: 0,
                                                    minWidth: "75px",
                                                    marginBottom: "22px",
                                                    marginRight: "7px",
                                                }}
                                                for="mail"
                                            >
                                                Trọng lượng(kg)
                                            </label>
                                            <div className="position-relative">
                                                <input
                                                    type="number"
                                                    class="ipbox"
                                                    id="mail"
                                                    name="weight"
                                                    onChange={handleChange}
                                                    value={values.weight}
                                                />
                                                {errors.weight &&
                                                    touched.weight && (
                                                        <p
                                                            className="position-absolute"
                                                            style={{
                                                                color: "red",
                                                                top: "40px",
                                                            }}
                                                        >
                                                            {errors.weight}
                                                        </p>
                                                    )}
                                            </div>
                                        </Box>
                                        <Box
                                            sx={{
                                                pl: "5px",
                                                display: "flex",
                                                width: "50%",
                                                alignItems: "center",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    flexShrink: 0,
                                                    marginBottom: "22px",
                                                    marginRight: "7px",
                                                }}
                                                for="mail"
                                            >
                                                Chiều dài(m)
                                            </label>
                                            <div className="position-relative">
                                                <input
                                                    type="number"
                                                    class="ipbox"
                                                    id="mail"
                                                    onChange={handleChange}
                                                    name="length"
                                                    value={values.length}
                                                />
                                                {errors.length &&
                                                    touched.length && (
                                                        <p
                                                            className="position-absolute"
                                                            style={{
                                                                color: "red",
                                                                top: "40px",
                                                            }}
                                                        >
                                                            {errors.length}
                                                        </p>
                                                    )}
                                            </div>
                                        </Box>
                                        <Box
                                            sx={{
                                                pr: "5px",
                                                display: "flex",
                                                width: "50%",
                                                alignItems: "center",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    flexShrink: 0,
                                                    marginBottom: "22px",
                                                    marginRight: "7px",
                                                }}
                                                for="mail"
                                            >
                                                Chiều rộng(m)
                                            </label>
                                            <div className="position-relative">
                                                <input
                                                    type="number"
                                                    class="ipbox"
                                                    id="mail"
                                                    name="width"
                                                    onChange={handleChange}
                                                    value={values.width}
                                                />
                                                {errors.width && touched.width && (
                                                    <p
                                                        className="position-absolute"
                                                        style={{
                                                            color: "red",
                                                            top: "40px",
                                                        }}
                                                    >
                                                        {errors.width}
                                                    </p>
                                                )}
                                            </div>
                                        </Box>
                                        <Box
                                            sx={{
                                                pl: "5px",
                                                display: "flex",
                                                width: "50%",
                                                alignItems: "center",
                                            }}
                                        >
                                            <label
                                                style={{
                                                    flexShrink: 0,
                                                    marginBottom: "22px",
                                                    marginRight: "7px",
                                                }}
                                                for="mail"
                                            >
                                                Chiều cao(m)
                                            </label>
                                            <div className="position-relative">
                                                <input
                                                    type="number"
                                                    class="ipbox"
                                                    id="mail"
                                                    name="height"
                                                    onChange={handleChange}
                                                    value={values.height}
                                                />
                                                {errors.height &&
                                                    touched.height && (
                                                        <p
                                                            className="position-absolute"
                                                            style={{
                                                                color: "red",
                                                                top: "40px",
                                                            }}
                                                        >
                                                            {errors.height}
                                                        </p>
                                                    )}
                                            </div>
                                        </Box>
                                    </Box>
                                    <label for="yourm">Ghi chú</label>
                                    <textarea
                                        rows="5"
                                        id="yourm"
                                        name="note"
                                        onChange={handleChange}
                                        value={values.note}
                                    ></textarea>
                                </form>
                            </div>
                            <div class="form-grid col-md-6 col-lg-6 col-xl-6">
                                <h3>Hình ảnh</h3>
                                <Text>
                                    Vui lòng đăng tải ít nhất 1 hình ảnh!
                                </Text>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={10}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                            }}
                                            className="upload__image-wrapper mt-1"
                                        >
                                            {imageList.map((image, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        position: "relative",
                                                        marginRight: "15px",
                                                        marginBottom: "15px",
                                                        border: "1px solid #b3abab",
                                                        width: "100px",
                                                        height: "110px",
                                                    }}
                                                >
                                                    <Image
                                                        src={image.data_url}
                                                        alt=""
                                                        sx={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <Button
                                                        sx={{
                                                            border: "none",
                                                            background:
                                                                "transparent",
                                                            position:
                                                                "absolute",
                                                            padding: "0px 1px",
                                                            color: "#343333",
                                                            right: 0,
                                                            top: 0,
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onImageRemove(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <i
                                                            class="fa fa-times-circle"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </Button>
                                                </Box>
                                            ))}
                                            <Button
                                                sx={{
                                                    width: "100px",
                                                    height: "110px",
                                                    border: "none",
                                                    overflow: "hidden",
                                                    borderStyle: "outset",
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onImageUpload();
                                                }}
                                                {...dragProps}
                                            >
                                                <Image
                                                    sx={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        transition: "all 0.2s",
                                                        "&:hover": {
                                                            transform:
                                                                "scale(1.2)",
                                                        },
                                                    }}
                                                    src="/images/upload-placeholder.jpg"
                                                ></Image>
                                            </Button>
                                        </Box>
                                    )}
                                </ImageUploading>
                            </div>
                            <Button
                                sx={{
                                    margin: "30px auto 80px",
                                    padding: "20px 250px",
                                    background:
                                        "-webkit-linear-gradient(135deg, rgb(255, 16, 83) 0%, rgb(52, 82, 255) 100% )",
                                    outline: "none",
                                }}
                                type="submit"
                            >
                                Gửi yêu cầu
                            </Button>
                        </div>
                    </form>
                </div>
                {overlay && (
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "#0b0b1447",
                            zIndex: 100000,
                        }}
                        onClick={hideMapPicker}
                    ></Box>
                )}
            </section>
        </>
    );
};
export default Order;
