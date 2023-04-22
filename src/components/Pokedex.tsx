'use client';
import { useAppDispatch } from "@/store";
import { useListPokedexQuery } from '@/store/modules/pokedex/query';
import { resetPokedex, usePokedex } from '@/store/modules/pokedex/slice';
import { pokedexAsync } from '@/store/modules/pokedex/thunks';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useState } from 'react';

export type PokedexProps = {
  title?: string;
};

export const Pokedex = ({ title }: PokedexProps): JSX.Element => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  // const { pokemonList } = usePokedex();
  // const dispatch = useAppDispatch();
  const { data, refetch } = useListPokedexQuery({ page, size });
  console.log('data', data);


  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
    }}>

      <h1>lista</h1>
      {/* <Button
        variant="outlined"
        onClick={() => dispatch(resetPokedex())}
      >
        RESETAR
      </Button> */}
      <Button
        variant="contained"
        // onClick={() => dispatch(pokedexAsync({}))}
        onClick={() => refetch()}>
        BUSCAR
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,

        }}
      >
        {/* {data.map((pokemon:) => (
          <Box key={pokemon.name}
            sx={{
              border: '1px solid black',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography>{pokemon.name}</Typography>
            <Avatar src={pokemon.img} alt={pokemon.name} />
          </Box>
        ))} */}

        <DataGridPro
          pagination
          pageSize={size}
          page={page}
          rowsPerPageOptions={[10, 20, 50]}
          sx={{
            height: '1000px',
          }}
          // pageSizeOptions={[10, 20, 50]}
          paginationMode='server'
          onPageChange={(params) => {
            setPage(params);
            refetch();
          }}
          onPageSizeChange={(params) => {
            setSize(params);
            refetch();
          }}
          rows={data?.results || []}
          rowCount={data?.totalItems || 0}
          columns={[
            {
              field: 'name',
              filterable: true,
              renderHeader: (params) => {
                return (
                  <Box>
                    <Typography>Nome</Typography>
                  </Box>
                )
              },
            },
            {
              field: 'img',
              renderHeader(params) {
                return <Typography>Imagem</Typography>
              },
              renderCell: (params) => {
                return <Avatar src={params.row?.sprites?.front_default} alt={params.row.name} />
              }
            }
          ]}
        />
      </Box>
    </Box>
  );
};
