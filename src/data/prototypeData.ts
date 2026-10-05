import type { CallItem, PointItem, StudyItem } from '../types/domain'

export const initialCalls: CallItem[] = [
  { id: 1, name: 'Velas brancas', total: 20, remaining: 20, unit: 'unidades', image: '/images/velas.svg' },
  { id: 2, name: 'Café', total: 2, remaining: 2, unit: 'kg', image: '/images/cafe.svg' },
  { id: 3, name: 'Flores brancas', total: 3, remaining: 3, unit: 'buquês', image: '/images/flores.svg' },
]

export const prototypeStudies: StudyItem[] = [
  {
    id: 1,
    title: 'Ervas na Umbanda',
    category: 'Ervas',
    type: 'Material geral',
    progress: 72,
    summary: 'Conteúdo introdutório para organizar o estudo sobre usos e significados.',
    lessons: ['Introdução às ervas', 'Cuidados e preparo', 'Ervas de uso comum', 'Anotações da casa'],
  },
  {
    id: 2,
    title: 'Linhas de trabalho',
    category: 'Fundamentos',
    type: 'Fundamento da casa',
    progress: 30,
    summary: 'Estrutura que será revisada e preenchida com a orientação da Tenda.',
    lessons: ['Visão geral', 'Organização da casa', 'Material para validação'],
  },
  {
    id: 3,
    title: 'História da Umbanda',
    category: 'História',
    type: 'Material geral',
    progress: 10,
    summary: 'Base histórica para leitura e discussão em grupo.',
    lessons: ['Contexto histórico', 'Formação e diversidade', 'Leituras recomendadas'],
  },
  {
    id: 4,
    title: 'Desenvolvimento mediúnico',
    category: 'Desenvolvimento',
    type: 'Fundamento da casa',
    progress: 0,
    summary: 'Área reservada para material validado pelos responsáveis da casa.',
    lessons: ['Conteúdo a validar', 'Orientações da casa'],
  },
]

export const prototypePoints: PointItem[] = [
  {
    id: 1,
    title: 'Ponto de Caboclo',
    group: 'Caboclo',
    source: 'Referência a cadastrar pela casa',
    lyrics: 'Trecho demonstrativo do protótipo: mata, caminho, força e caridade.',
    referenceUrl: 'https://www.youtube.com/results?search_query=ponto+de+caboclo+umbanda',
  },
  {
    id: 2,
    title: 'Ponto de Preto-Velho',
    group: 'Preto-Velho',
    source: 'Referência a cadastrar pela casa',
    lyrics: 'Trecho demonstrativo do protótipo: conselho, paciência, terreiro e oração.',
    referenceUrl: 'https://www.youtube.com/results?search_query=ponto+de+preto+velho+umbanda',
  },
  {
    id: 3,
    title: 'Ponto de Erê',
    group: 'Erê',
    source: 'Referência a cadastrar pela casa',
    lyrics: 'Trecho demonstrativo do protótipo: alegria, cuidado, infância e esperança.',
    referenceUrl: 'https://www.youtube.com/results?search_query=ponto+de+ere+umbanda',
  },
]
