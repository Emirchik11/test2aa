import React, { useState } from 'react';
import { Select, Card } from 'antd';
import usePokemonStore from '../store/usePokemonStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDetails = async (url) => {
    const res = await axios.get(url);
    return res.data;
};

const PokemonCard = ({ url }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['pokemon', url],
        queryFn: () => fetchDetails(url),
        enabled: !!url
    });

    if (isLoading || !data) return <Card loading />;

    const imageUrl = data.sprites?.front_default;

    return (
        <Card title={data.name} cover={<img src={imageUrl} alt={data.name} style={{ height: 150, objectFit: 'contain' }} />}>
            HP: {data.stats[0].base_stat}<br />
            Attack: {data.stats[1].base_stat}<br />
            Defense: {data.stats[2].base_stat}
        </Card>
    );
};

const Arena = () => {
    const { collection } = usePokemonStore();
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);

    const firstStats = useQuery({
        queryKey: ['pokemon', first],
        queryFn: () => fetchDetails(first),
        enabled: !!first
    });

    const secondStats = useQuery({
        queryKey: ['pokemon', second],
        queryFn: () => fetchDetails(second),
        enabled: !!second
    });

    const winner = (firstStats.data && secondStats.data)
        ? (firstStats.data.stats[1].base_stat > secondStats.data.stats[1].base_stat
            ? firstStats.data.name
            : secondStats.data.name)
        : null;

    return (
        <div>
            <Select style={{ width: 200, margin: 10 }} onChange={setFirst} placeholder="Select 1">
                {collection.map((p) => (
                    <Select.Option key={p.name} value={p.url}>{p.name}</Select.Option>
                ))}
            </Select>
            <Select style={{ width: 200, margin: 10 }} onChange={setSecond} placeholder="Select 2">
                {collection.map((p) => (
                    <Select.Option key={p.name} value={p.url}>{p.name}</Select.Option>
                ))}
            </Select>
            <div style={{ display: 'flex', gap: '2rem', marginTop: 20 }}>
                {first && <PokemonCard url={first} />}
                {second && <PokemonCard url={second} />}
            </div>
            {winner && <h2>🏆 Победитель: {winner}</h2>}
        </div>
    );
};

export default Arena;
