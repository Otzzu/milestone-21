import { Database } from "@/types_db"

export interface ReviewWithUserProps {
    content: string | null
    created_at: string | null
    id: string
    tags: string[] | null
    user_id: Database["public"]["Tables"]["users"]["Row"]
}

export interface RoadmapModalData {
    semester: string,
    tahun: string,
    desc: string,
    details: string[],
}


