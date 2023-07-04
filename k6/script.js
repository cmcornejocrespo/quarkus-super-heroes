import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

const endpoint = `${__ENV.FRONT}`;

export const options = {
    // thresholds: {
    //     http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    //     http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    // },
    discardResponseBodies: true,
    scenarios: {
        // index: {
        //     executor: 'constant-arrival-rate',
        //     exec: 'index',
        //     // How long the test lasts
        //     duration: '1m30s',
        //     // How many iterations per timeUnit
        //     rate: 50,
        //     // Start `rate` iterations per second
        //     timeUnit: '5s',
        //     // Pre-allocate VUs
        //     preAllocatedVUs: 100,
        // },
        index: {
            executor: 'ramping-vus',
            exec: 'index',
            startVUs: 5000,
            stages: [
                { duration: '30s', target: 50 },
                { duration: '1m30s', target: 100 },
                { duration: '1m30s', target: 500 },
                { duration: '2m', target: 1000 },
                { duration: '1m', target: 5000 },
                { duration: '1m', target: 1500 },
                { duration: '1m', target: 500 },
            ],
            gracefulRampDown: '5s',
        },
        // index: {
        //     executor: 'constant-arrival-rate',
        //     exec: 'index',
        //     rate: 10,
        //     timeUnit: '1s',
        //     duration: '1m',
        //     preAllocatedVUs: 500,
        // },
        // browseProduct: {
        //     executor: 'ramping-arrival-rate',
        //     exec: 'browseProduct',
        //     stages: [
        //         { duration: '30s', target: 50 },
        //         // { duration: '1m30s', target: 500 },
        //         // { duration: '1m30s', target: 5000 },
        //         // { duration: '2m', target: 500 },
        //         { duration: '1m', target: 50 },
        //     ],
        //     // Pre-allocate VUs
        //     preAllocatedVUs: 250,
        // },
        // viewCart: {
        //     executor: 'ramping-arrival-rate',
        //     exec: 'viewCart',
        //     stages: [
        //         { duration: '30s', target: 50 },
        //         // { duration: '1m30s', target: 500 },
        //         // { duration: '1m30s', target: 5000 },
        //         // { duration: '2m', target: 500 },
        //         { duration: '1m', target: 50 },
        //     ],
        //     // Pre-allocate VUs
        //     preAllocatedVUs: 250,
        // },
        // addToCart: {
        //     executor: 'ramping-arrival-rate',
        //     exec: 'addToCart',
        //     stages: [
        //         { duration: '30s', target: 10 },
        //         // { duration: '1m30s', target: 500 },
        //         // { duration: '1m30s', target: 5000 },
        //         // { duration: '2m', target: 500 },
        //         { duration: '1m', target: 10 },
        //     ],
        //     // Pre-allocate VUs
        //     preAllocatedVUs: 50,
        // },
        // checkout: {
        //     executor: 'ramping-arrival-rate',
        //     exec: 'checkout',
        //     stages: [
        //         { duration: '1m30s', target: 50 },
        //         // { duration: '30s', target: 100 },
        //         // { duration: '1m30s', target: 200 },
        //         // { duration: '2m', target: 100 },
        //         { duration: '1m', target: 50 },
        //     ],
        //     // Pre-allocate VUs
        //     preAllocatedVUs: 250,
        // },
    }
};

// export default function () {
//   http.get('http://ui-super-heroes-quarkus-hero.apps.ocp-quarkes-demo.sandbox2646.opentlc.com');
//   sleep(1);
// }

export function index() {
    // BDD style
    describe('Loads An Angular application to pick up a random superhero, a random supervillain, and makes them fight', () => {
        // when
        const response = http.get(endpoint);

        //then
        expect(response.status, 'response status').to.equal(200);
        sleep(1 + Math.random()); // sleep between 1s and 2s
    });
}

