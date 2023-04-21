import VasilyInstance from './VasilyInstance.ts';
import express from 'express';

const app: VasilyInstance = new VasilyInstance(express());

app.run();
