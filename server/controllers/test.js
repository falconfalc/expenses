//@ts-check
import HttpStatus from "http-status";

const get = async (ctx, next) => {
    const res = ["Speaking javascript", "Fluent Python", "Pro Python", "The Go programming language"];

    ctx.status = HttpStatus.OK;
    ctx.body = res;

    await next();
};

const ctrl = {
    get
};

export default ctrl;