import { findDoctorAvailability } from "../queries/availability.queries"

export const getDoctorAvailabilty = async (doctorId: number,dayOfWeek: number) =>{
  return await findDoctorAvailability(doctorId,dayOfWeek)
}