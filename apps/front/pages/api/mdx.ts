import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "next-mdx-remote/serialize";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const dataSerialized = serialize(`
        # Hola mundo

        ## Probando cosas
        Estamos probando cosas de Markdown

        ### TODOS

        * [ ] TODO
        * [x] DONE

        ### Listas
        - Item 1
        - Item 2
        - Item 3
    `);
    console.log(dataSerialized);
    return  res.status(200).json({ message: dataSerialized });
}