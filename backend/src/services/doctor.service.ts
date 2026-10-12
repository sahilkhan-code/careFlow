import findAllDoctors from "../queries/doctor.queries";

const getAllDoctors = async () => {
    return await findAllDoctors();
}

export default getAllDoctors;