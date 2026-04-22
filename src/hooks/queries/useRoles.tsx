import type { Role } from "../../types/entities/roleTypes";
import { ROLES_QUERY } from "../../services/role/roleQueries";
import { createEntityQuery } from "./createEntityQuery";

export default createEntityQuery<Role, "roles">(ROLES_QUERY, "roles");
