import { DidResolutionResult, DidResolver } from '../../src/did/did-resolver';
import { PublicJwk } from '../../src/jose/types';
import { TestDataGenerator } from './test-data-generator';
import sinon from 'sinon';

/**
 * Utility class for generating stub for testing.
 */
export class TestStubGenerator {
  /**
   * Creates a {DidResolver} stub for testing.
   * @param did The DID the resolution to be stubbed.
   * @param keyId The key ID of the public key returned in the stubbed resolution.
   * @param publicJwk The public key returned in the stubbed resolution.
   */
  public static createDidResolverStub(did: string, keyId: string, publicJwk: PublicJwk): DidResolver {

    // setting up a stub did resolver & message store
    const didResolutionResult = TestDataGenerator.createDidResolutionResult(did, keyId, publicJwk);
    const resolveStub = sinon.stub<[string], Promise<DidResolutionResult>>();
    resolveStub.withArgs(did).resolves(didResolutionResult);
    const didResolverStub = sinon.createStubInstance(DidResolver, { resolve: resolveStub });

    return didResolverStub;
  }
}
