import { getDonationDetailRequest } from "@/api/donation/donationRequest";
import { Button, Modal, QRCode, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

const DonationInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: donationDetail,
    isLoading,
    isError,
  } = useQuery(["/donation-detail", id], () =>
    getDonationDetailRequest(Number(id))
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (mailto: string) => {
    setIsModalOpen(false);
    window.location.href = mailto;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div id="modal-wrapper" className="max-w-xl bg-white">
        <div className="flex justify-between bg-[#005CAC] max-w-xl w-full p-4">
          <button onClick={() => router.push(`/donation-detail/${id}`)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 12.5L16.5 2L18.5 4L10 12.5L18.5 21L16.5 23L6 12.5Z"
                fill="white"
              />
            </svg>
          </button>

          <h3 className="text-[17px] not-italic font-semibold leading-[21px]">
            {donationDetail?.title || "Quyên góp"}
          </h3>

          <div className="w-6"></div>
        </div>
        {false ? (
          <div className="flex justify-center items-center p-4">
            <Skeleton active />
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4 justify-between">
            <div className="flex flex-col justify-between gap-2">
              <p className="text-black text-[18px] not-italic font-semibold leading-[27px]">
                Hướng dẫn
              </p>
              <div className="flex flex-col justify-between">
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  <span className="inline-block text-[#3F85FB] text-[16px] not-italic font-semibold leading-[24px]">
                    Bước 1:&nbsp;
                  </span>
                  Mở ứng dụng camera mặc định hoặc bất kì ứng dụng ngân hàng hỗ
                  trợ QR code của bạn
                </p>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  <span className="inline-block text-[#3F85FB] text-[16px] not-italic font-semibold leading-[24px]">
                    Bước 2:&nbsp;
                  </span>
                  Quét mã QR Code hoặc nhập số tài khoản theo hình bên dưới
                </p>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  <span className="inline-block text-[#3F85FB] text-[16px] not-italic font-semibold leading-[24px]">
                    Bước 3:&nbsp;
                  </span>
                  Kiểm tra tên tài khoản nhận đã đúng với tổ chức đó hay chưa,
                  sau đó nhập số tiền và tên của bạn vào ô ghi chú
                </p>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  <span className="inline-block text-[#3F85FB] text-[16px] not-italic font-semibold leading-[24px]">
                    Bước 4:&nbsp;
                  </span>
                  Sau khi giao dịch thành công, vui lòng bấm xác nhận “Tôi xác
                  nhận đã chuyển khoản thành công” ở bên dưới.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-black text-[18px] not-italic font-semibold leading-[27px]">
                Quét mã QR để Quyên góp:
              </p>
              {donationDetail?.qrcode ? (
                <div className="flex justify-center relative item-center border z-1 w-[164px] h-[164px] mx-auto">
                  <Image
                    src={donationDetail?.qrcode}
                    layout="fill"
                    objectFit="cover"
                    alt="banner"
                    className="p-2"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center p-2">
                  <QRCode value="https://lichviet.app/" status="loading" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between gap-2">
              <p className="text-black text-[18px] not-italic font-semibold leading-[27px]">
                Hoặc đóng góp trực tiếp vào số tài khoản
              </p>
              <div className="flex flex-col justify-between">
                <div className="flex justify-between">
                  <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                    Số Tài khoản:&nbsp;
                    <span className="inline-block text-black text-[16px] not-italic font-semibold leading-[24px]">
                      {donationDetail?.acount_bank}
                    </span>
                  </p>
                  {/* <button
                  className="flex justify-center gap-1 border p-1 rounded-full"
                  onClick={() => {
                    navigator?.clipboard?.writeText("STK");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.4318 0.494262L15.2557 2.31824C15.5722 2.6347 15.75 3.06392 15.75 3.51148V12.9375C15.75 13.8695 14.9945 14.625 14.0625 14.625H11.25V16.3125C11.25 17.2445 10.4945 18 9.5625 18H1.6875C0.755508 18 0 17.2445 0 16.3125V5.0625C0 4.13051 0.755508 3.375 1.6875 3.375H4.5V1.6875C4.5 0.755508 5.25551 0 6.1875 0H12.2385C12.6861 2.34027e-06 13.1153 0.177794 13.4318 0.494262ZM1.89844 16.3125H9.35156C9.46806 16.3125 9.5625 16.2181 9.5625 16.1016V14.625H6.1875C5.25551 14.625 4.5 13.8695 4.5 12.9375V5.0625H1.89844C1.78194 5.0625 1.6875 5.15694 1.6875 5.27344V16.1016C1.6875 16.2181 1.78194 16.3125 1.89844 16.3125ZM6.39844 12.9375C6.28194 12.9375 6.1875 12.8431 6.1875 12.7266V1.89844C6.1875 1.78194 6.28194 1.6875 6.39844 1.6875H10.125V4.78125C10.125 5.24725 10.5028 5.625 10.9688 5.625H14.0625V12.7266C14.0625 12.8431 13.9681 12.9375 13.8516 12.9375H6.39844ZM11.8125 3.9375H14.0625V3.59888C14.0625 3.54293 14.0403 3.48927 14.0007 3.44971L12.3003 1.74927C12.2607 1.70972 12.2071 1.6875 12.1511 1.6875H11.8125V3.9375Z"
                      fill="#3F85FB"
                    />
                  </svg>
                  <p className="inline-block text-center items-center text-[#3F85FB] text-[14px] not-italic font-semibold leading-[24px]">
                    Copy STK
                  </p>
                </button> */}
                </div>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  Ngân Hàng:&nbsp;
                  <span className="inline-block text-black text-[16px] not-italic font-semibold leading-[24px]">
                    {donationDetail?.name_bank}
                  </span>
                </p>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  C.Nhánh: {donationDetail?.address}
                </p>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  Chủ TK: {donationDetail?.acount_holder}
                </p>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  Số điện thoại: {donationDetail?.phone}
                </p>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="w-full text-white text-base bg-[#3F85FB] hover:bg-blue-800 font-semibold rounded-lg px-5 py-2.5 me-2 mb-2"
                onClick={showModal}
              >
                Tôi xác nhận đã chuyển khoản thành công
              </button>
            </div>
            <div className="flex justify-between gap-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.8291 14.7991L10.1238 0.672265C10.0101 0.464963 9.85288 0.301026 9.6519 0.1807C9.45141 0.0602684 9.23396 0 8.99988 0C8.76579 0 8.5483 0.0603739 8.34771 0.1807C8.14712 0.301026 7.98983 0.464963 7.87618 0.672265L0.170744 14.7991C-0.0634066 15.2208 -0.0567296 15.6422 0.190775 16.0636C0.3046 16.2574 0.460103 16.4114 0.65739 16.5249C0.854817 16.6387 1.06714 16.6957 1.29458 16.6957H16.7053C16.933 16.6957 17.1453 16.6387 17.3426 16.5249C17.5401 16.4114 17.6954 16.2574 17.8092 16.0636C18.0567 15.6419 18.0635 15.2208 17.8291 14.7991ZM10.2845 13.7958C10.2845 13.8894 10.2525 13.9679 10.1892 14.0314C10.1257 14.095 10.0504 14.1266 9.96336 14.1266H8.03702C7.95008 14.1266 7.87481 14.095 7.81131 14.0314C7.74773 13.9679 7.71596 13.8894 7.71596 13.7958V11.8894C7.71596 11.7959 7.74777 11.7173 7.81131 11.6538C7.87481 11.5902 7.94998 11.5586 8.03702 11.5586H9.96322C10.0503 11.5586 10.1256 11.5902 10.1891 11.6538C10.2525 11.7173 10.2843 11.7959 10.2843 11.8894V13.7958H10.2845ZM10.1591 10.209C10.2224 10.1655 10.2576 10.1104 10.2645 10.0435L10.4449 5.43822C10.4449 5.35795 10.4115 5.29438 10.3447 5.24761C10.2577 5.17391 10.1776 5.13726 10.1038 5.13726H7.89659C7.82294 5.13726 7.74267 5.17405 7.65573 5.24761C7.58886 5.29438 7.55537 5.36459 7.55537 5.45832L7.72591 10.0433C7.72591 10.1104 7.75929 10.1653 7.82635 10.209C7.89319 10.2524 7.97345 10.2742 8.06703 10.2742H9.92323C10.0169 10.2742 10.0954 10.2525 10.1591 10.209Z"
                    fill="#3F85FB"
                  />
                </svg>
              </div>

              <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                Nếu bạn có bất kỳ vấn đề gì về giao dịch, xin vui lòng liên hệ
                ngân hàng của bạn.
              </p>
            </div>
            <Modal
              open={isModalOpen}
              closeIcon={null}
              onCancel={handleCancel}
              wrapClassName="max-w-xl"
              centered
              footer={[
                <div key="footer" className="flex justify-center item-center">
                  <button
                    type="button"
                    className="w-1/2 text-white bg-[#3F85FB] hover:bg-blue-800 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 uppercase"
                    onClick={() => handleOk(`mailto:${donationDetail?.email}`)}
                  >
                    Gửi email
                  </button>
                </div>,
              ]}
            >
              <div className="flex flex-col justify-between -mx-6 -mt-5 gap-4 mb-6">
                <div className="flex flex-col justify-between items-center text-center gap-4">
                  <div className="flex justify-center border rounded-b-none rounded-lg relative z-1 w-full h-[215px]">
                    <Image
                      src="/images/thankyou.png"
                      layout="fill"
                      objectFit="cover"
                      alt="banner"
                      className="rounded-b-none rounded-lg"
                      priority
                    />
                  </div>

                  <p className="text-[#222222] text-[18px] not-italic font-semibold leading-[27px] px-5">
                    Cảm ơn bạn - Bạn vừa làm một điều tốt để giúp hàng ngàn người
                    cơ nhỡ ngoài kia.
                  </p>
                </div>
                <div className="flex flex-col justify-between px-5 gap-2">
                  <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                    Nếu bạn muốn nhận chứng từ khấu trừ thuế, xin vui lòng gửi
                    email đến tổ chức từ thiện : {donationDetail?.title}:
                    {donationDetail?.email}
                  </p>
                  <div className="flex flex-col justify-between">
                    <p className="text-black text-[16px] not-italic font-semibold leading-[24px]">
                      Với các thông tin sau:
                    </p>
                    <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                      Họ tên
                    </p>
                    <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                      Phiếu chuyển khoản ngân hàng hoặc hình ảnh giao dịch thành
                      công
                    </p>
                    <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                      Số Căn cước công dân/CMT
                    </p>
                    <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                      Mã số thuế
                    </p>
                    <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                      Số điện thoại
                    </p>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default DonationInfo;
