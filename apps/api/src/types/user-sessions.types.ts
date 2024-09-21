// Enum for session states, assuming 7 possible states
export enum SessionState {
  Active = 0,
  Paused = 1,
  Completed = 2,
  Pending = 3,
  // Add other states as necessary (up to 7)
}

export interface UserSession {
  /**
   * Primary identifier for the session.
   */
  id: number;

  /**
   * ID of the user or system that created the session.
   * Nullable field.
   */
  createdById?: number | null;

  /**
   * Timestamp when the session was created.
   */
  createdTime: string; // Should follow date-time format (ISO 8601)

  /**
   * ID of the user associated with the session.
   */
  userId: number;

  /**
   * ID of the host (device or machine) where the session took place.
   */
  hostId: number;

  /**
   * State of the user session.
   * Enum values represent different states such as active, paused, etc.
   */
  state: SessionState;

  /**
   * Total duration of the session.
   * Typically measured in seconds or minutes.
   */
  span: number;

  /**
   * Amount of time that has been billed during the session's active span.
   * Measured in seconds or minutes.
   */
  billedSpan: number;

  /**
   * The last time the session was placed on hold or pending.
   * Nullable field.
   */
  pendTime?: string | null;

  /**
   * Duration of the current pending state of the session.
   * Measured in seconds or minutes.
   */
  pendSpan: number;

  /**
   * The time when the session ended, if applicable.
   * Nullable field.
   */
  endTime?: string | null;

  /**
   * Slot number associated with the session.
   * Could represent a time slot or machine allocation.
   */
  slot: number;

  /**
   * Total time the session has spent in a pending state over its lifecycle.
   * Measured in seconds or minutes.
   */
  pendSpanTotal: number;

  /**
   * Duration of the current paused state of the session.
   * Measured in seconds or minutes.
   */
  pauseSpan: number;

  /**
   * Total time the session has spent in a paused state throughout its lifecycle.
   * Measured in seconds or minutes.
   */
  pauseSpanTotal: number;
}
