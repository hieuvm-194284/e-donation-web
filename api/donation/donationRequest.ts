import { request } from "../axios"

export const getDonationRequest = () => {
  return request({
    url: '/get-list',
    method: 'POST',
  }).then(res => res.data)
}

export const getDonationDetailRequest = (id: number) => {
  return request({
    url: '/get-detail',
    method: 'POST',
    data: {id: id}
  }).then(res => res.data)
}
