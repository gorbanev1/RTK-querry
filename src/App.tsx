import {useState, type FormEvent} from "react"
import {useAppDispatch, useAppSelector} from "./app/store"
import {createDeckTC,} from "./features/decks/decksSlice"
import {useGetDecksQuery} from "./api/decksRtkApi.ts";

const PAGE_SIZE = 3

export function App() {
    const dispatch = useAppDispatch()
    const {isCreating, createError,} = useAppSelector((state) => state.decks)
    const [page, setPage] = useState(1)
    const [name, setName] = useState("")
    const {data, isLoading, isFetching, isError, refetch} = useGetDecksQuery(
        {
            page,
            pageSize: PAGE_SIZE,
        },
        {
            refetchOnMountOrArgChange: true
        }
    )
    console.log(data, isLoading, isError)
    const items = data?.items ?? []
    const totalCount = data?.totalCount ?? 0
    const pagesCount = data?.pagesCount ?? 0


    async function handleCreate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!name.trim()) return

        try {
            await dispatch(createDeckTC(name.trim())).unwrap()
            setName("")
            if (page === 1) {
                void refetch()
            } else {
                setPage(1) // useEffect подгрузит первую страницу
            }
        } catch {
            // Сообщение об ошибке появится из state.decks.createError
        }
    }

    return (
        <main className="container">
            <p className="eyebrow">УЧЕБНЫЙ ПРОЕКТ: AXIOS + REDUX THUNK</p>
            <h1>Мои колоды</h1>
            <p className="muted">Получаем данные с PHP-сервера Timeweb и сохраняем их в Redux.</p>

            <form onSubmit={handleCreate} className="create-form">
                <label htmlFor="deck-name">Название новой колоды</label>
                <div className="controls">
                    <input
                        id="deck-name"
                        placeholder="Например, React Hooks"
                        maxLength={100}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <button disabled={isCreating || !name.trim()} type="submit">
                        {isCreating ? "Создаём…" : "Создать"}
                    </button>
                </div>
                {createError && <p role="alert" className="error">{createError}</p>}
            </form>

            <section className="section">
                <div className="section-heading">
                    <h2>Список колод</h2>
                    <span className="counter">Всего: {totalCount}</span>
                </div>
                {isFetching && <p className="muted">Загружаем колоды…</p>}
                {isError && <p className="error" role="alert">Ошибка загрузки колод</p>}
                {!isFetching && items.length === 0 && <p>Пока нет колод.</p>}
                <ul className="deck-list">
                    {items.map((deck) => (
                        <li className="deck" key={deck.id}>
                            <strong>{deck.name}</strong>
                            <small>{new Date(deck.createdAt).toLocaleDateString("ru-RU")}</small>
                        </li>
                    ))}
                </ul>
                <nav className="pagination" aria-label="Страницы">
                    <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Назад</button>
                    <span>Страница {page} из {Math.max(1, pagesCount)}</span>
                    <button type="button" disabled={page >= pagesCount} onClick={() => setPage((p) => p + 1)}>Далее
                    </button>
                </nav>
            </section>
        </main>
    )
}
