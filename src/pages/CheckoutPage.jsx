import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "./Footer";
import { Field, Form, Formik } from "formik";
import CartItemCheckout from "../components/CartItemCheckout";
import { useCart } from "../store";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total } = useCart();

  const [toggleSelector, setToggleSelector] = useState(false);
  const [toggleSelector2, setToggleSelector2] = useState(false);

  const toggle = () => {
    toggleSelector ? setToggleSelector(false) : setToggleSelector(true);
  };

  const toggle2 = () => {
    toggleSelector2 ? setToggleSelector2(false) : setToggleSelector2(true);
  };

  let fieldStyle =
    "w-77.25 h-14 rounded-lg input bg-white border border-[#CFCFCF]  placeholder:text-black/40 placeholder:text-[14px] placeholder:font-bold mt-2.25";

  let fieldStyle2 =
    "w-full h-14 rounded-lg input bg-white border border-[#CFCFCF]  placeholder:text-black/40 placeholder:text-[14px] placeholder:font-bold mt-2.25";

  return (
    <div className="w-full h-full overflow-auto bg-Gray">
      <Header />
      <div className="w-full flex items-center justify-center">
        <div className="container w-full flex items-center flex-col justify-center max-w-81.75 md:max-w-172.25 lg:max-w-277.5 ">
          <div className="w-full mt-19.75">
            <Link
              to={"../"}
              className="font-manrope font-normal text-[15px] leading-6.25 text-black/50 hover:text-realorange "
            >
              {" "}
              Go Back
            </Link>
          </div>
          <div className="w-full h-281.5  mt-9.5">
            <Formik>
              <Form className="w-full h-full flex gap-7.5 ">
                <div className="w-182.5 h-full flex  justify-center rounded-lg bg-white">
                  <div className="container max-w-158.5 mt-13.5">
                    <h2 className="font-manrope font-bold text-[32px] leading-9 tracking-[1.14px] text-black">
                      CHECKOUT
                    </h2>
                    <p className="font-manrope font-bold text-[13px] leading-6.25 tracking-[0.93] text-realorange mt-10.25 uppercase">
                      Billing Details
                    </p>
                    <div className="w-full gap-4 flex mt-4">
                      <label
                        htmlFor=""
                        className="font-manrope font-bold text-[12px] text-black -tracking-[0.21]"
                      >
                        Name
                        <Field
                          className={`${fieldStyle}`}
                          placeholder="Alexei Ward"
                        />
                      </label>
                      <label
                        htmlFor=""
                        className="font-manrope font-bold text-[12px] text-black -tracking-[0.21]"
                      >
                        Email Address
                        <Field
                          className={`${fieldStyle}`}
                          placeholder="alexei@mail.com"
                        />
                      </label>
                    </div>
                    <label
                      htmlFor=""
                      className="font-manrope font-bold text-[12px] text-black -tracking-[0.21] flex flex-col mt-6"
                    >
                      Phone Number
                      <Field
                        className={`${fieldStyle}`}
                        placeholder="+1 202-555-0136"
                      />
                    </label>
                    <p className="font-manrope font-bold text-[13px] leading-6.25 tracking-[0.93] text-realorange mt-13.25 uppercase">
                      shipping info
                    </p>
                    <div className="w-full h-72.75 flex flex-col gap-6 mt-4">
                      <label
                        htmlFor=""
                        className="font-manrope font-bold text-[12px] text-black -tracking-[0.21]"
                      >
                        Address
                        <Field
                          className={`${fieldStyle2}`}
                          placeholder="1137 Williams Avenue"
                        />
                      </label>
                      <div className="w-full gap-4 flex ">
                        <label
                          htmlFor=""
                          className="font-manrope font-bold text-[12px] text-black -tracking-[0.21]"
                        >
                          ZIP Code
                          <Field
                            className={`${fieldStyle}`}
                            placeholder="10001"
                          />
                        </label>
                        <label
                          htmlFor=""
                          className="font-manrope font-bold text-[12px] text-black -tracking-[0.21]"
                        >
                          City
                          <Field
                            className={`${fieldStyle}`}
                            placeholder="New York"
                          />
                        </label>
                      </div>
                      <label
                        htmlFor="country"
                        className="font-manrope font-bold text-[12px] text-black -tracking-[0.21] flex flex-col"
                      >
                        Country
                        <Field
                          className={`${fieldStyle}`}
                          placeholder="United States"
                          id="country"
                        />
                      </label>
                    </div>
                    <p className="font-manrope font-bold text-[13px] leading-6.25 tracking-[0.93] text-realorange mt-13.25 uppercase">
                      payment details
                    </p>
                    <div className="w-full h-32 flex justify-between mt-4">
                      <p className="font-manrope font-bold text-[12px] text-black -tracking-[0.21] ">
                        Payment Method
                      </p>
                      <div className="w-77.25 h-full flex gap-4 flex-col">
                        <div
                          className={`w-full h-14 border   rounded-lg flex items-center gap-4 ${toggleSelector ? "border-realorange" : "border-[#CFCFCF]"} `}
                        >
                          <Field
                            type="radio"
                            name="radio-12"
                            defaultChecked
                            className="radio border border-[#CFCFCF]  checked:text-realorange checked:bg-transparent ml-4"
                            onChange={toggle}
                          />
                          <p className="font-manrope font-bold text-[14px] text-black -tracking-[0.25]">
                            e-Money
                          </p>
                        </div>
                        <div className="w-full h-14 border border-[#CFCFCF] rounded-lg flex items-center gap-4">
                          <Field
                            type="radio"
                            name="radio-12"
                            defaultChecked
                            className="radio border border-[#CFCFCF]  checked:text-realorange checked:bg-transparent ml-4"
                            onChange={toggle2}
                          />
                          <p className="font-manrope font-bold text-[14px] text-black -tracking-[0.25]">
                            Cash on Delivery
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full gap-4 flex mt-6">
                      <label
                        htmlFor=""
                        className="font-manrope font-bold text-[12px] text-black -tracking-[0.21]"
                      >
                        e-Money Number
                        <Field
                          className={`${fieldStyle}`}
                          placeholder="238521993"
                        />
                      </label>
                      <label
                        htmlFor=""
                        className="font-manrope font-bold text-[12px] text-black -tracking-[0.21]"
                      >
                        e-Money PIN
                        <Field className={`${fieldStyle}`} placeholder="6891" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-87.5 h-153 cart here bg-white rounded-lg flex justify-center">
                  <div className="container max-w-71 mt-8">
                    <p className="font-manrope font-bold text-[18px] text-black tracking-[1.29px]">
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
                            $ {total}
                          </p>
                        </div>

                        <Link
                          to={"/checkout"}
                          className="w-full h-12 md:mt-8 flex justify-center items-center uppercase bg-realorange hover:bg-faintorange font-manrope text-[13px] font-bold text-white tracking-[2px]"
                        >
                          CONTINUE & PAY
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
