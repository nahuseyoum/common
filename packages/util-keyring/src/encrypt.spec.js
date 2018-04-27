// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromString = require('@polkadot/util/u8a/fromString');
const u8aConcat = require('@polkadot/util/u8a/concat');

const index = require('./index');

const { PKCS8_DIVIDER, PKCS8_HEADER } = require('./pair/defaults');

describe('encrypt', () => {
  const publicKey = new Uint8Array([47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238]);
  const seedOne = u8aFromString('12345678901234567890123456789012');
  let keypair;

  beforeEach(() => {
    keypair = index();

    keypair.addFromSeed(seedOne);
  });

  it('encrypts the key', () => {
    expect(
      keypair.encrypt(publicKey, 'test')
    ).toEqual(
      u8aConcat(
        PKCS8_HEADER, seedOne, PKCS8_DIVIDER, publicKey
      )
    );
  });

  it('returns throws for non-existing', () => {
    expect(
      () => keypair.encrypt(new Uint8Array([]), 'test')
    ).toThrow(/Unable to retrieve/);
  });
});