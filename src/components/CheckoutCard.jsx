import { ErrorMessage, Field, Form, Formik } from "formik";
import CartItemCheckout from "./CartItemCheckout";
import { domain, toggleSuccesBox, useCart } from "../store";
import { useState } from "react";
import { Link } from "react-router-dom";
import shape from "../assets/Shape.png";
import * as Yup from "yup";
import axios from "axios";

export default function CheckoutCard() {
  const { items, total } = useCart();
  const openBox = toggleSuccesBox((state) => state.openBox);

  const handleSubmit = (values) => {
    console.log(values);
    let url = domain + "/api/orders";

    let data = {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      country: values.country,
      adress: values.adress,
      zip_code: +values.zip_code,
      city: values.city,
      payment_method: values.payment_method,
    };

    if (values.payment_method === "e_money") {
      data.e_moneyNumber = values.e_moneyNumber;
      data.e_moneyPin = values.e_moneyPin;
    }

    axios
      .post(url, { data })
      .then((res) => {
        openBox();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const validation = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Wrong format").required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    adress: Yup.string().required("Adress is required"),
    zip_code: Yup.string().required("Zip code is required"),
    city: Yup.string().required("City is required"),
    e_moneyPin: Yup.number("pin must be a number").when("payment_method", {
      is: "e_money",
      then: (schema) => schema.required("e-Money PIN is required"),
    }),
    e_moneyNumber: Yup.number("e-Money Number must be a number").when(
      "payment_method",
      {
        is: "e_money",
        then: (schema) => schema.required("e-Money Number is required"),
      },
    ),
  });

  let fieldStyle =
    "w-full md:w-77.25 h-14 rounded-lg input bg-white border  focus:outline-none  placeholder:text-black/40 placeholder:text-[14px] placeholder:font-bold mt-2.25 font-manrope font-bold text-[14px] text-black -tracking-[0.25px]";

  let fieldStyle2 =
    "w-full h-14 rounded-lg input bg-white border  focus:outline-none placeholder:text-black/40 placeholder:text-[14px] placeholder:font-bold mt-2.25 font-manrope font-bold text-[14px] text-black -tracking-[0.25px]";
  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validation}
      initialValues={{
        name: "",
        email: "",
        phone_number: "",
        adress: " ",
        zip_code: "",
        city: "",
        country: "",
        payment_method: "",
        e_moneyNumber: "",
        e_moneyPin: "",
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="w-full h-full flex flex-col lg:flex-row gap-7.5 ">
          <div className="w-full lg:w-182.5 h-344.5 md:h-271 lg:h-full flex  justify-center rounded-lg bg-white">
            <div className="container max-w-70 md:max-w-[634.5px] lg:max-w-158.5 mt-7.5 lg:mt-13.5">
              <h2 className="font-manrope font-bold text-[28px] md:text-[32px] leading-9 tracking-[1.14px] text-black">
                CHECKOUT
              </h2>
              <p className="font-manrope font-bold text-[13px] leading-6.25 tracking-[0.93] text-realorange mt-8 md:mt-10.25 uppercase">
                Billing Details
              </p>
              <div className="w-full gap-6 md:gap-4 h-46.5 md:h-auto flex flex-col md:flex-row mt-4">
                <div className="flex flex-col h-20.25">
                  <div className="flex h-4 justify-between items-center">
                    <label
                      htmlFor=""
                      className={`font-manrope font-bold text-[12px]  -tracking-[0.21] ${errors.name && touched.name ? "text-[#CD2C2C]" : "text-black"} `}
                    >
                      Name
                    </label>
                    <ErrorMessage
                      name="name"
                      className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                      component={"p"}
                    />
                  </div>
                  <Field
                    name="name"
                    className={`${fieldStyle} ${
                      values.name && !errors.name
                        ? " border-realorange bg-white"
                        : errors.name && touched.name
                          ? "border-[#CD2C2C] border-2"
                          : "border-[#CFCFCF] "
                    }  `}
                    placeholder="Alexei Ward"
                  />
                </div>
                <div className="flex flex-col h-20.25 ">
                  <div className="flex h-4 justify-between items-center ">
                    <label
                      htmlFor=""
                      className={`font-manrope font-bold text-[12px] -tracking-[0.21] ${errors.email && touched.email ? "text-[#CD2C2C]" : "text-black"} `}
                    >
                      Email Address
                    </label>
                    <ErrorMessage
                      name="email"
                      className="font-manrope font-normal text-[#CD2C2C] text-[12px] -tracking-[0.21px]  "
                      component={"p"}
                    />
                  </div>
                  <Field
                    name="email"
                    className={`${fieldStyle} ${
                      values.email && !errors.email
                        ? " border-realorange bg-white"
                        : errors.email && touched.email
                          ? "border-[#CD2C2C] border-2"
                          : "border-[#CFCFCF] "
                    } `}
                    placeholder="alexei@mail.com"
                  />
                </div>
              </div>
              <div className="flex flex-col h-20.25 mt-6">
                <div className="w-77.25 flex h-4 justify-between items-center">
                  <label
                    htmlFor=""
                    className={`font-manrope font-bold text-[12px] -tracking-[0.21] ${errors.phone_number && touched.phone_number ? "text-[#CD2C2C]" : "text-black"} `}
                  >
                    Phone Number
                  </label>
                  <ErrorMessage
                    name="phone_number"
                    className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                    component={"p"}
                  />
                </div>
                <Field
                  name="phone_number"
                  className={`${fieldStyle} ${
                    values.phone_number && !errors.phone_number
                      ? " border-realorange bg-white"
                      : errors.phone_number && touched.phone_number
                        ? "border-[#CD2C2C] border-2"
                        : "border-[#CFCFCF] "
                  } `}
                  placeholder="+1 (202) 555-0136"
                />
              </div>
              <p className="font-manrope font-bold text-[13px] leading-6.25 tracking-[0.93] text-realorange mt-8 md:mt-13.25 uppercase">
                shipping info
              </p>
              <div className="w-full h-99 md:h-72.75 flex flex-col gap-6 mt-4">
                <div className="flex flex-col h-20.25 md:mt-6">
                  <div className="flex h-4 justify-between items-center">
                    <label
                      htmlFor=""
                      className={`font-manrope font-bold text-[12px] ${errors.adress && touched.adress ? "text-[#CD2C2C]" : "text-black"} -tracking-[0.21px]`}
                    >
                      Address
                    </label>
                    <ErrorMessage
                      name="adress"
                      className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                      component={"p"}
                    />
                  </div>
                  <Field
                    name="adress"
                    className={`${fieldStyle2} ${
                      values.adress && !errors.adress
                        ? " border-realorange bg-white"
                        : errors.adress && touched.adress
                          ? "border-[#CD2C2C] border-2"
                          : "border-[#CFCFCF] "
                    } `}
                    placeholder="1137 Williams Avenue"
                  />
                </div>
                <div className="w-full h-46.5 md:h-auto flex flex-col md:flex-row gap-6 md:gap-4 ">
                  <div className="flex flex-col h-20.25">
                    <div className="flex h-4 justify-between items-center">
                      <label
                        htmlFor=""
                        className={`font-manrope font-bold text-[12px] ${errors.zip_code && touched.zip_code ? "text-[#CD2C2C]" : "text-black"} -tracking-[0.21px]`}
                      >
                        ZIP Code
                      </label>
                      <ErrorMessage
                        name="zip_code"
                        className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                        component={"p"}
                      />
                    </div>
                    <Field
                      name="zip_code"
                      className={`${fieldStyle} ${
                        values.zip_code && !errors.zip_code
                          ? " border-realorange bg-white"
                          : errors.zip_code && touched.zip_code
                            ? "border-[#CD2C2C] border-2"
                            : "border-[#CFCFCF] "
                      } `}
                      placeholder="10001"
                    />
                  </div>
                  <div className="flex flex-col h-20.25">
                    <div className="flex h-4 justify-between items-center">
                      <label
                        htmlFor=""
                        className={`font-manrope font-bold text-[12px] ${errors.city && touched.city ? "text-[#CD2C2C]" : "text-black"} -tracking-[0.21px]`}
                      >
                        City
                      </label>
                      <ErrorMessage
                        name="city"
                        className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                        component={"p"}
                      />
                    </div>
                    <Field
                      name="city"
                      className={`${fieldStyle} ${
                        values.city && !errors.city
                          ? " border-realorange bg-white"
                          : errors.city && touched.city
                            ? "border-[#CD2C2C] border-2"
                            : "border-[#CFCFCF] "
                      } `}
                      placeholder="New York"
                    />
                  </div>
                </div>
                <div className="flex flex-col h-20.25">
                  <div className="w-full md:w-77.25 flex h-4 justify-between items-center">
                    <label
                      htmlFor=""
                      className={`font-manrope font-bold text-[12px] ${errors.country && touched.country ? "text-[#CD2C2C]" : "text-black"} -tracking-[0.21px]`}
                    >
                      Country
                    </label>
                    <ErrorMessage
                      name="country"
                      className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                      component={"p"}
                    />
                  </div>
                  <Field
                    name="country"
                    className={`${fieldStyle} ${
                      values.country && !errors.country
                        ? " border-realorange bg-white"
                        : errors.country && touched.country
                          ? "border-[#CD2C2C] border-2"
                          : "border-[#CFCFCF] "
                    } `}
                    placeholder="United States"
                  />
                </div>
              </div>

              <p className="font-manrope font-bold text-[13px] leading-6.25 tracking-[0.93] text-realorange mt-8 md:mt-13.25 uppercase">
                payment details
              </p>
              <div className="w-full h-40.25 md:h-32 flex flex-col md:flex-row md:justify-between mt-4">
                <p className="font-manrope font-bold text-[12px] text-black -tracking-[0.21] ">
                  Payment Method
                </p>
                <div className="w-full md:w-77.25 h-full mt-4.25 md:mt-0 flex gap-4 flex-col">
                  <label
                    onClick={() => setFieldValue("payment_method", "e_money")}
                    className={`w-full h-14   rounded-lg flex items-center gap-4 ${values.payment_method === "e_money" ? "border border-realorange" : "border border-[#CFCFCF]"} `}
                  >
                    <Field
                      type="radio"
                      name="payment_method"
                      value="e_money"
                      className="radio border border-[#CFCFCF]  checked:text-realorange checked:bg-transparent ml-4"
                    />
                    <p className="font-manrope font-bold text-[14px] text-black -tracking-[0.25]">
                      e-Money
                    </p>
                  </label>
                  <label
                    onClick={() => setFieldValue("payment_method", "e_money")}
                    className={`w-full h-14 border   rounded-lg flex items-center gap-4 ${values.payment_method === "cash" ? "border-realorange" : "border-[#CFCFCF]"} `}
                  >
                    <Field
                      type="radio"
                      name="payment_method"
                      value="cash"
                      className="radio border border-[#CFCFCF]  checked:text-realorange checked:bg-transparent ml-4"
                    />
                    <p className="font-manrope font-bold text-[14px] text-black -tracking-[0.25]">
                      Cash on Delivery
                    </p>
                  </label>
                </div>
              </div>
              {values.payment_method === "e_money" ? (
                <div className="w-full gap-4 flex flex-col md:flex-row mt-6">
                  <div className="flex flex-col h-20.25">
                    <div className="flex h-4 justify-between items-center">
                      <label
                        htmlFor=""
                        className={`font-manrope font-bold text-[12px] ${errors.e_moneyNumber && touched.e_moneyNumber ? "text-[#CD2C2C]" : "text-black"} -tracking-[0.21px]`}
                      >
                        e-Money Number
                      </label>
                      <ErrorMessage
                        name="e_moneyNumber"
                        className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                        component={"p"}
                      />
                    </div>
                    <Field
                      name="e_moneyNumber"
                      className={`${fieldStyle} ${
                        values.e_moneyNumber && !errors.e_moneyNumber
                          ? " border-realorange bg-white"
                          : errors.e_moneyNumber && touched.e_moneyNumber
                            ? "border-[#CD2C2C] border-2"
                            : "border-[#CFCFCF] "
                      } `}
                      placeholder="238521993"
                    />
                  </div>
                  <div className="flex flex-col h-20.25">
                    <div className="flex h-4 justify-between items-center">
                      <label
                        htmlFor=""
                        className={`font-manrope font-bold text-[12px] ${errors.e_moneyPin && touched.e_moneyPin ? "text-[#CD2C2C]" : "text-black"} -tracking-[0.21px]`}
                      >
                        e-Money PIN
                      </label>
                      <ErrorMessage
                        name="e_moneyPin"
                        className="text-[#CD2C2C] text-[12px] -tracking-[0.21px]"
                        component={"p"}
                      />
                    </div>
                    <Field
                      name="e_moneyPin"
                      className={`${fieldStyle} ${
                        values.e_moneyPin && !errors.e_moneyPin
                          ? " border-realorange bg-white"
                          : errors.e_moneyPin && touched.e_moneyPin
                            ? "border-[#CD2C2C] border-2"
                            : "border-[#CFCFCF] "
                      } `}
                      placeholder="6891"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full mt-6 lg:mt-7.5 flex flex-col md:flex-row items-center gap-4 md:gap-8 ">
                  <img src={shape} alt="" className="w-12 h-12" />
                  <p className="font-manrope text-center md:text-start font-bold text-[15px] leading-6.25 text-black/50">
                    The ‘Cash on Delivery’ option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-full lg:w-87.5 h-153 cart here bg-white rounded-lg flex justify-center">
            <div className="container max-w-69.75 md:max-w-158 lg:max-w-71 mt-8">
              <p className="font-manrope font-bold text-[18px] text-black tracking-[1.29px] uppercase">
                summary
              </p>
              <div className="w-full h-60 mt-7.25 overflow-auto flex flex-col gap-6">
                {items?.map((el) => (
                  <CartItemCheckout key={el.documentId} product={el} />
                ))}
              </div>
              <div className="w-full h-35 mt-8 flex flex-col gap-6">
                <div className="w-full h-auto flex flex-col gap-2">
                  <div className="w-full flex justify-between">
                    <p className="font-manrope font-bold text-[15px] leading-6.25  text-black/50 uppercase">
                      total
                    </p>
                    <p className="font-manrope font-bold text-black text-[18px]">
                      $ {total}
                    </p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-manrope font-bold text-[15px] leading-6.25  text-black/50 uppercase">
                      SHIPPING
                    </p>
                    <p className="font-manrope font-bold text-black text-[18px]">
                      $ {50}
                    </p>
                  </div>
                  <div className="w-full flex justify-between">
                    <p className="font-manrope font-bold text-[15px] leading-6.25  text-black/50 uppercase">
                      {"VAT (INCLUDED)"}
                    </p>
                    <p className="font-manrope font-bold text-black text-[18px]">
                      $ 1,079
                    </p>
                  </div>
                </div>
                <div className="flex flex-col  ">
                  <div className=" w-full flex justify-between">
                    <p className="font-manrope font-bold text-[15px] leading-6.25  text-black/50 uppercase">
                      GRAND TOTAL
                    </p>
                    <p className="font-manrope font-bold text-realorange text-[18px]">
                      $ {total + 50}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 mt-8 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
                  >
                    CONTINUE & PAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
