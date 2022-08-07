import { TypeSystemDepartment } from "@/interface/system/department";

/**
 * @name filterServiceToForm db to form
 */
export function filterServiceToForm(data: TypeSystemDepartment.DTO) {
  return {
    ...data,
    users: data.users.map((v) => v.id),
  };
}
