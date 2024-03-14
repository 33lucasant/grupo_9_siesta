import React from "react";
import { Link } from 'react-router-dom';

function Error404(){
    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only"></span>ERROR 404
                    </h2>
                    <img src="https://i.gifer.com/yH.gif" alt="error404" style={{marginBottom: '20px'}}/>
                    <p className="text-2xl font-semibold md:text-3xl">Página no encontrada</p>
                    <Link rel="noopener noreferrer" to="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Volver al inicio</Link>
                </div>

            </div>
        </section>
    )
}

export default Error404;