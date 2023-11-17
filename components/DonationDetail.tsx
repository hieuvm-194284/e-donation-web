import { getDonationDetailRequest } from "@/api/donation/donationRequest";
import { Modal, Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

const DonationDetail = () => {
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

  const handleOk = () => {
    setIsModalOpen(false);
    router.push(`/donation-info/${id}`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-w-xl bg-white">
        <div className="flex justify-between bg-[#005CAC] max-w-xl w-full p-4">
          <button onClick={() => router.push("/")}>
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
          <div className="flex flex-col gap-3 p-4 justify-between">
            <div className="flex justify-start items-center gap-4">
              <Image
                src={donationDetail?.logo}
                width={42}
                height={42}
                alt="Donation"
                className="rounded-full"
              />

              <h3 className="text-black text-[18px] not-italic font-semibold leading-[27px]">
                {donationDetail?.title}
              </h3>
            </div>
            <div>
              <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                {donationDetail?.description}
              </p>
            </div>
            <div>
              <div
                className="text-black not-italic font-normal"
                dangerouslySetInnerHTML={{
                  __html: donationDetail?.content,
                }}
              ></div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="button"
                className="w-1/2 text-white bg-[#3F85FB] hover:bg-blue-800 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 uppercase"
                onClick={showModal}
              >
                Quyên góp
              </button>
            </div>
            <Modal
              open={isModalOpen}
              closeIcon={null}
              onOk={handleOk}
              onCancel={handleCancel}
              wrapClassName="max-w-xl"
              centered
              footer={[
                <div key="footer" className="flex justify-center gap-4">
                  <button
                    type="button"
                    className="w-1/2 text-white bg-[#9D9D9D] hover:bg-gray-600 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 uppercase"
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="w-1/2 text-white bg-[#3F85FB] hover:bg-blue-800 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 uppercase"
                    onClick={handleOk}
                  >
                    Đồng ý
                  </button>
                </div>,
              ]}
            >
              <div className="flex flex-col justify-between items-center text-center gap-4 mb-6">
                <div className="flex justify-between items-center -mt-14">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="82"
                    height="82"
                    viewBox="0 0 82 82"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M78.4537 32.3652C76.329 15.6169 61.7492 3 44.4912 3H37.5091C20.2511 3 5.67133 15.6169 3.5466 32.3652C3.18389 34.3388 3 36.3568 3 38.3659V45.2038C3 63.839 18.4808 79 37.5091 79H44.4912C63.5195 79 79 63.839 79 45.2038V38.3659C79 36.3568 78.8164 34.3388 78.4537 32.3652Z"
                      fill="white"
                    />
                    <path
                      d="M78.4537 32.3652C76.329 15.6169 61.7492 3 44.4912 3H37.5091C20.2511 3 5.67133 15.6169 3.5466 32.3652C3.18389 34.3388 3 36.3568 3 38.3659V45.2038C3 63.839 18.4808 79 37.5091 79H44.4912C63.5195 79 79 63.839 79 45.2038V38.3659C79 36.3568 78.8164 34.3388 78.4537 32.3652"
                      stroke="white"
                      stroke-width="6"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M78.4537 32.3652C76.329 15.6169 61.7492 3 44.4912 3H37.5091C20.2511 3 5.67133 15.6169 3.5466 32.3652C3.18389 34.3388 3 36.3568 3 38.3659V45.2038C3 63.839 18.4808 79 37.5091 79H44.4912C63.5195 79 79 63.839 79 45.2038V38.3659C79 36.3568 78.8164 34.3388 78.4537 32.3652Z"
                      fill="#D9F2FF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M37.5397 44.7211C37.3443 44.5362 37.2354 44.4383 37.132 44.3349C35.6382 42.8436 34.1461 41.3506 32.6511 39.8606C32.471 39.6814 32.2843 39.5071 32.087 39.3475C30.7655 38.2771 28.7307 38.4797 27.6425 39.7857C26.4813 41.1799 26.5964 42.9921 27.9486 44.3493C30.2733 46.6821 32.6051 49.0081 34.9352 51.3356C36.5186 52.917 38.4087 52.9176 39.9916 51.3359C44.6613 46.6692 49.3301 42.0017 53.9974 37.3326C54.1874 37.1424 54.3693 36.9416 54.5329 36.7285C55.8433 35.0187 55.0035 32.385 52.9453 31.7444C51.5708 31.3167 50.4228 31.7083 49.4293 32.703C45.5681 36.5695 41.7016 40.4299 37.8404 44.2961C37.7253 44.4115 37.6486 44.5651 37.5397 44.7211ZM39.6605 18H42.3568C43.1265 18.0968 43.9008 18.1665 44.6655 18.2943C49.4708 19.0971 53.6585 21.1637 57.105 24.6063C62.2742 29.7701 64.5495 36.0464 63.8883 43.3141C63.4445 48.1926 61.5348 52.5042 58.2714 56.1678C53.9372 61.0331 48.4836 63.6543 41.9752 63.9714C37.4366 64.1923 33.1695 63.1343 29.2849 60.7659C23.3132 57.1249 19.6478 51.8502 18.3584 44.9595C18.197 44.0971 18.1176 43.2194 18 42.3486C18 41.4501 18 40.5516 18 39.6532C18.0367 39.3301 18.0743 39.0069 18.1101 38.6835C18.6609 33.734 20.552 29.368 23.889 25.6662C27.432 21.7357 31.8221 19.2823 37.0454 18.358C37.9111 18.2047 38.7885 18.1178 39.6605 18Z"
                      fill="#3F85FB"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M37.5397 44.7301C37.6486 44.5741 37.7253 44.4204 37.8404 44.3049C41.7016 40.4375 45.5681 36.5757 49.4293 32.7079C50.4228 31.713 51.5708 31.3212 52.9453 31.749C55.0035 32.3898 55.8433 35.0245 54.5329 36.7348C54.3693 36.948 54.1874 37.1488 53.9974 37.3392C49.3301 42.0098 44.6613 46.6789 39.9916 51.3471C38.4087 52.9293 36.5186 52.9287 34.9352 51.3468C32.6051 49.0186 30.2733 46.6918 27.9486 44.3582C26.5964 43.0005 26.4813 41.1877 27.6425 39.7931C28.7307 38.4866 30.7655 38.2839 32.087 39.3547C32.2843 39.5144 32.471 39.6888 32.6511 39.868C34.1461 41.3585 35.6382 42.852 37.132 44.3437C37.2354 44.4472 37.3443 44.5452 37.5397 44.7301Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <p className="text-[#222222] text-[18px] not-italic font-semibold leading-[27px]">
                  Xác nhận
                </p>
                <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                  Tôi xác nhận đồng ý với chính sách quyên góp của nền tảng.
                </p>
                <a
                  className="text-[#007AFF] text-[16px] not-italic font-medium leading-4 underline underline-offset-4"
                  href={""}
                  target="_blank"
                >
                  Điều khoản & chính sách
                </a>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default DonationDetail;
