import { decodeJwt } from "jose"
import Cookies from "js-cookie"

export const GetPartnerData = (): PartnerType | undefined => {
    const token = Cookies.get("partner_jwt")
    let partner_data: PartnerType | undefined

    if (token) {
        try {
            const decoded = decodeJwt(token) as PartnerType
            partner_data = decoded
        } catch (error) {
            console.error("Invalid JWT detected, removing cookie:", error)
            Cookies.remove("partner_jwt")
        }
    }

    return partner_data
}
