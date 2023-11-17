// @ts-ignore
import GiftCodeModel from '../models/giftCodeModel.ts'

async function get_gift_codes() {
    return GiftCodeModel.find({expired: false});
}

async function find_gift_code(code:string) {
    return GiftCodeModel.findOne({code: code, expired: false});
}

async function insert_gift_code(giftCode:any) {
    const response = await GiftCodeModel.create(giftCode);
    return response;
}

async function update_code_expired(codeObject:any, isExpired:boolean) {
    const response = await GiftCodeModel.updateOne({code: codeObject.code}, {expired: isExpired});
    return response;
}

async function delete_expired_gift_codes() {
    const response = await GiftCodeModel.deleteMany({expired: true});
    return response;
}

export default {
    get_gift_codes,
    find_gift_code,
    insert_gift_code,
    update_code_expired,
    delete_expired_gift_codes
}