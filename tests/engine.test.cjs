'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),E=require('../web/engine.js');
const copy=()=>structuredClone(E.initial);

test('Alice sequence links failures, success and follow-up evidence',()=>{const r=E.run(copy());assert.equal(r.metrics.sequences,1);assert.deepEqual(r.rows[0].evidence,['a1','a2','a3','a4','a5','a6']);});
test('Bob benign lookalike does not meet the threshold',()=>{const x=copy();x.actor='bob';assert.equal(E.run(x).metrics.sequences,0);});
test('Too-small windows do not link unrelated failures',()=>{const x=copy();x.windowMinutes=1;assert.equal(E.run(x).metrics.sequences,0);});
test('Disposition requires a supporting analyst note',()=>{const x=copy();x.disposition='confirmed';assert.throws(()=>E.run(x),/supporting/);x.note='Reviewed all six linked events.';assert.equal(E.run(x).report.analyst.disposition,'confirmed');});
test('Naive timestamps and duplicate identifiers are rejected',()=>{const x=copy();x.events[0].time='2026-01-15T09:00:00';assert.throws(()=>E.run(x),/timezone/);const y=copy();y.events.push({...y.events[0]});assert.throws(()=>E.run(y),/unique/);});
test('Input order does not change the time-ordered timeline',()=>{const x=copy();x.events.reverse();assert.equal(E.run(x).timeline[0].id,'a1');});
