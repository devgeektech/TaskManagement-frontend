import api from "./api";

const API_URL = process.env.REACT_APP_API_URL
export const LOGIN_URL = `${API_URL}/auth/login`
export const ADD_TASK = `${API_URL}/auth/add`
export const GET_TASK = `${API_URL}/auth/tasks`
export const USER = `${API_URL}/auth/user`
export const TASK = `${API_URL}/auth/alltask`
export const ADD_TASk_HISTORY=`${API_URL}/auth/taskhistory`


export function login(data) {
    return api.post(LOGIN_URL,data)
}

export function addTask(data) {
    return api.post(ADD_TASK,data)
}
export function getTaskHistory(id){
    return api.get(`${GET_TASK}/?taskId=${id}`)
}

export function getUser(){
    return api.get(USER)
}
export function addUser(data){
    return api.post(`${USER}/add`,data)
}
export function deleteUser(id){
    return api.delete(`${USER}/delete/${id}`)
}

export function updateUser(id,data){
    return api.put(`${USER}/update/${id}`,data)
}
export function addTaskHistory(data){
    return api.post(`${ADD_TASk_HISTORY}/add`,data)
}
export function allTask(data){
    return api.get(`${TASK}`,data)
}


