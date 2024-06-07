import { PrismaClient } from "@prisma/client";

const prisma   = new PrismaClient();

prisma.$connect().then(()=>{
    console.log("banco ok")
}).catch((error) =>{
    console.log(error)
})

export default prisma