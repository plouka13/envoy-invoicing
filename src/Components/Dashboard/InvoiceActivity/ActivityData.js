import axios from 'axios'
import { trackPromise } from 'react-promise-tracker'
import { backend_base_url } from '../../../Constants'

const token = localStorage.getItem('user')

// total invoices sent

let url = ''
let config = {
  headers: {
    token,
  },
}

// url = backend_base_url + 'stats/sent'
//
// export const get_total_sent = trackPromise(
//     axios.get(url, config)
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {
//             return error
//         })
// )

// total invoices received

url = backend_base_url + 'stats/received'

export const get_total_received = trackPromise(
  axios
    .get(url, config)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
)

// total invoices created

url = backend_base_url + 'stats/created'

export const get_total_created = trackPromise(
  axios
    .get(url, config)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
)

// stats for today

url = backend_base_url + 'stats/day'

export const get_today_stats = trackPromise(
  axios
    .get(url, config)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
)

// stats for month

url = backend_base_url + 'stats/month'

export const get_month_stats = trackPromise(
  axios
    .get(url, config)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
)

// stats for year

url = backend_base_url + 'stats/year'

export const get_year_stats = trackPromise(
  axios
    .get(url, config)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
)

// stats for past 30 days (graph)

url = backend_base_url + 'stats/thirtydays'

export const get_past_thirty_stats = trackPromise(
  axios
    .get(url, config)
    .then((data) => {
      return data
    })
    .catch((error) => {
      return error
    })
)
