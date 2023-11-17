import { getDonationRequest } from "@/api/donation/donationRequest";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

type Donation = {
  id: number;
  title: string;
  logo: string;
  image_banner: string;
  description: string;
};

const ListDonations = () => {
  const router = useRouter();
  const {
    data: listDonation,
    isLoading,
    isError,
  } = useQuery(["/donations"], () => getDonationRequest());
  return (
    <>
      <div className="max-w-xl">
        <div className="flex justify-between bg-[#005CAC] max-w-xl w-full p-4">
          <div>
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
          </div>

          <h3 className="text-[17px] not-italic font-semibold leading-[21px]">
            Quyên góp
          </h3>

          <div className="w-6"></div>
        </div>
        <div className="flex flex-col gap-[10px] justify-between">
          <div className="flex flex-col gap-2 justify-between bg-white p-4 border border-y-[1px] border-solid">
            <h3 className="text-black text-[18px] not-italic font-semibold leading-[27px]">
              E-Donation - Thiện nguyện mỗi ngày
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-black text-[16px] not-italic font-normal leading-[24px]">
                E-Donation là tính năng tập hợp tất cả các tổ chức đang gây quỹ
                từ thiện trên Lịch Việt. Nơi bạn có thể thực hiện “Sống tốt”
                bằng cách quyên góp.
              </p>
              <Image
                src="/images/donation.png"
                width={138}
                height={138}
                alt="Picture of the author"
              />
            </div>
            <div>
              <a
                className="text-[#007AFF] text-[16px] not-italic font-medium leading-4 underline underline-offset-4"
                href={""}
                target="_blank"
              >
                Điều khoản & chính sách
              </a>
            </div>
          </div>
          {isLoading || isError ? (
            <Skeleton active />
          ) : (
            <div>
              {listDonation?.length > 0 &&
                listDonation?.map((item: Donation) => (
                  <div
                    key={item?.id}
                    className="flex flex-col gap-4 justify-between bg-white p-4"
                  >
                    <div className="flex justify-center border rounded-lg relative z-1 max-w-screen-xl h-[227px]">
                      <Image
                        src={item?.image_banner}
                        layout="fill"
                        objectFit="cover"
                        alt="banner"
                        className="rounded-lg"
                        priority
                      />
                    </div>

                    <h3 className="text-black text-[18px] not-italic font-semibold leading-[27px]">
                      {item?.description}
                    </h3>

                    <div className="flex justify-start items-center gap-4">
                      <Image
                        src={item?.logo}
                        width={42}
                        height={42}
                        alt="Donation"
                        className="rounded-full"
                      />
                      <h3 className="text-black text-[18px] not-italic font-medium leading-[27px]">
                        {item?.title}
                      </h3>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        type="button"
                        className="w-1/2 text-white bg-[#3F85FB] hover:bg-blue-800 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 uppercase"
                        onClick={() =>
                          router.push(`donation-detail/${item?.id}`)
                        }
                      >
                        Quyên góp
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListDonations;
