// Íconos de línea (SVG) de cada categoría
const trazos = {
    Cuerdas: (
        <>
            <path d="m11.9 12.1 4.514-4.514" />
            <path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z" />
            <path d="m6 16 2 2" />
            <path d="M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z" />
        </>
    ),
    Percusión: (
        <>
            <path d="m2 2 8 8" />
            <path d="m22 2-8 8" />
            <ellipse cx="12" cy="9" rx="10" ry="5" />
            <path d="M7 13.4v7.9" />
            <path d="M12 14v8" />
            <path d="M17 13.4v7.9" />
            <path d="M2 9v8a10 5 0 0 0 20 0V9" />
        </>
    ),
    Equipos: (
        <>
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <circle cx="12" cy="14" r="4" />
            <line x1="12" x2="12.01" y1="6" y2="6" />
        </>
    ),
    Accesorios: (
        <>
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
        </>
    ),
    Todas: (
        <>
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </>
    ),
};

function IconoCategoria({ nombre }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {trazos[nombre]}
        </svg>
    );
}

export default IconoCategoria;