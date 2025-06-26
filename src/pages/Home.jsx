import React, { useRef, useCallback, useState } from 'react';
import { Card, Button, Row, Col, Spin, Input } from 'antd';
import { usePokemons } from '../hooks/usePokemons';
import usePokemonStore from '../store/usePokemonStore';

const getIdFromUrl = (url) => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
};

const Home = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = usePokemons();
    const { addToCollection } = usePokemonStore();
    const observer = useRef();
    const [search, setSearch] = useState('');

    const lastPokemonRef = useCallback((node) => {
        if (isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isFetchingNextPage, hasNextPage]);

    if (status === 'loading') return <Spin />;
    if (!data) return <p>Error: No data</p>;

    const filteredResults = data.pages.flatMap((page) =>
        page.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <>
            <Input.Search
                placeholder="Search Pokémon by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 20, maxWidth: 400 }}
                allowClear
            />
            <Row gutter={[16, 16]}>
                {filteredResults.map((pokemon, index) => {
                    const id = getIdFromUrl(pokemon.url);
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                    const isLast = index === filteredResults.length - 1;

                    return (
                        <Col key={pokemon.name} span={6} ref={isLast ? lastPokemonRef : null}>
                            <Card
                                title={pokemon.name}
                                cover={<img alt={pokemon.name} src={imageUrl} style={{ height: 150, objectFit: 'contain' }} />}
                                actions={[<Button onClick={() => addToCollection(pokemon)}>Catch</Button>]}
                            >
                                ID: {id}
                            </Card>
                        </Col>
                    );
                })}
                {isFetchingNextPage && <Spin />}
            </Row>
        </>
    );
};

export default Home;
