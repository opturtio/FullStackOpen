import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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

export default { initPersons, add }