import request from "../utils/request"

const url = {
  getSchools: "/api/school/getschool",
  getMajors: "/api/school/getall"
}

export type SchoolItem = {
  schoolCode: string;
  schoolName: string;
}

export type MajorItem = {
  code: string;
  majorName: string;
  schoolCode?: string;
  schoolName?: string;
}

export const getSchools: () => Promise<SchoolItem[]> = async () => {
  return await request(url.getSchools)
}

export const getMajors: (schoolCode?: string) => Promise<MajorItem[]> = async (schoolCode) => {
  return await request(url.getMajors, {
    data: {
      schoolCode
    }
  })
}