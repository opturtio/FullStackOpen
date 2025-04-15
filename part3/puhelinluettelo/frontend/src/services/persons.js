import axios from 'axios'
const baseUrl = '/api/persons'

const initPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const add = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => {
        return response.data
    })
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => {
        return response.data
    })
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  }

export default { initPersons, add, deletePerson, update }