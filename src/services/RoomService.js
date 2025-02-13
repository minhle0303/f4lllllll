import axios from "axios";

const URL_ROOM= "http://localhost:8081/api/dashboard";


const fetchAllRoom = () => {
    const URL_BACKEND = `${URL_ROOM}/rooms`;
    return axios.get(URL_BACKEND);
}

const createRoom = (club, trainer, roomName, slug, capacity, facilities, status, startTime, endTime) => {
    const URL_BACKEND = `${URL_ROOM}/room/add`;
    const data = {
        club: club,
        trainer: trainer,
        roomName: roomName,
        slug: slug,
        capacity: capacity,
        facilities: facilities,
        status: status,
        startTime: startTime,
        endTime: endTime
    };
    return axios.post(URL_BACKEND, data);
}

const updateRoom = (id,club, trainer, roomName, slug, capacity, facilities, status, startTime, endTime) => {
    const URL_BACKEND = `${URL_ROOM}/room/update/${id}`;
    const data = {
        club: club,
        trainer: trainer,
        roomName: roomName,
        slug: slug,
        capacity: capacity,
        facilities: facilities,
        status: status,
        startTime: startTime,
        endTime: endTime
    };
    return axios.put(URL_BACKEND, data);
}


const deleteRoom = (id) => {
    const URL_BACKEND = `${URL_ROOM}/room/delete/${id}`;
    return axios.delete(URL_BACKEND);
}



export {
    fetchAllRoom,
    createRoom,
    deleteRoom,
    updateRoom

}