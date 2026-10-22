/**
 * Test-only negative fixture. Intentionally not a valid AccessContextV1 or
 * AuthorizationDecisionV1; it cannot accidentally create authorization.
 */
export function makeInvalidAuthorizationFixture(): Readonly<Record<string, never>> {
  return Object.freeze({});
}
