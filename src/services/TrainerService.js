import axios from "axios";

const URL_TRAINER = "http://localhost:8081/api/dashboard";

const fetchAllTrainer = () => {
    const URL_BACKEND = `${URL_TRAINER}/trainers`;
    return axios.get(URL_BACKEND);
}

const deleteTrainer = (id) => {
    const URL_BACKEND = `${URL_TRAINER}/trainer/delete/${id}`;
    return axios.delete(URL_BACKEND);
}

const createTrainer = (fullName, slug, file, specialization, experienceYear, certificate, phoneNumber, scheduleTrainers, branch) => {
    const URL_BACKEND = `${URL_TRAINER}/trainer/add`;

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('slug', slug);
    if (file) {
        formData.append("file", file);
    }
    formData.append('specialization', specialization);
    formData.append('experienceYear', experienceYear);
    formData.append('certificate', certificate);
    formData.append('phoneNumber', phoneNumber);
    formData.append('branch', branch);

    // Schedule trainers would likely need to be sent as a JSON string

    formData.append('scheduleTrainers', scheduleTrainers.join(','));
    return axios.post(URL_BACKEND, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });


}

const updateTrainer = (id, fullName, slug, file, specialization, experienceYear, certificate, phoneNumber, scheduleTrainers, branch) => {
    const URL_BACKEND = `${URL_TRAINER}/trainer/update/${id}`;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("fullName", fullName);
    formData.append("slug", slug);
    formData.append("file", file ? file : null);
    formData.append("specialization", specialization);
    formData.append("experienceYear", experienceYear);
    formData.append("certificate", certificate);
    formData.append("phoneNumber", phoneNumber);
    formData.append('scheduleTrainers', scheduleTrainers.join(','));
    formData.append("branch", branch);
    console.log("FormData being sent:", Array.from(formData.entries())); // Log FormData


    return axios.put(URL_BACKEND, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export {
    fetchAllTrainer,
    deleteTrainer,
    createTrainer,
    updateTrainer,
}