import { PLAYER_TYPE_ENDPOINTS } from "@/config/api";
import { makeAuthenticatedRequest } from "./base-service";
import { PlayerType, PlayerTypeAttribute, PlayerTypeSpecialization } from "@/types/player-types";

export class PlayerTypesAPI {
  /**
   * Fetch all player type categories
   */
  static async fetchCategories(): Promise<string[]> {
    try {
      console.log('Fetching player type categories');
      const response:any = await makeAuthenticatedRequest(PLAYER_TYPE_ENDPOINTS.CATEGORIES);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Fetch player types, optionally filtered by category
   */
  static async fetchPlayerTypes(category?: string): Promise<PlayerType[]> {
    try {
      console.log(`Fetching player types${category ? ` for category: ${category}` : ''}`);
      const params = category ? { category } : {};
      const response = await makeAuthenticatedRequest(
        PLAYER_TYPE_ENDPOINTS.PLAYER_TYPES,
        'get',
        undefined,
        params
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching player types:', error);
      throw error;
    }
  }

  /**
   * Fetch a specific player type by ID
   */
  static async fetchPlayerType(id: string | number): Promise<PlayerType | null> {
    try {
      console.log(`Fetching player type with ID: ${id}`);
      const response = await makeAuthenticatedRequest(PLAYER_TYPE_ENDPOINTS.PLAYER_TYPE_BY_ID(id));
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching player type ${id}:`, error);
      throw error;
    }
  }

  /**
   * Fetch child player types for a parent
   */
  static async fetchChildren(parentId: string | number): Promise<PlayerType[]> {
    try {
      console.log(`Fetching children for player type ID: ${parentId}`);
      const response = await makeAuthenticatedRequest(PLAYER_TYPE_ENDPOINTS.CHILDREN(parentId));
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching children for player type ${parentId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch specializations for a player type
   */
  static async fetchSpecializations(playerTypeId: string | number): Promise<PlayerTypeSpecialization[]> {
    try {
      console.log(`Fetching specializations for player type ID: ${playerTypeId}`);
      const response = await makeAuthenticatedRequest(PLAYER_TYPE_ENDPOINTS.SPECIALIZATIONS(playerTypeId));
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching specializations for player type ${playerTypeId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch attributes for a player type
   */
  static async fetchAttributes(playerTypeId: string | number): Promise<PlayerTypeAttribute[]> {
    try {
      console.log(`Fetching attributes for player type ID: ${playerTypeId}`);
      const response = await makeAuthenticatedRequest(PLAYER_TYPE_ENDPOINTS.ATTRIBUTES(playerTypeId));
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching attributes for player type ${playerTypeId}:`, error);
      throw error;
    }
  }

  /**
   * Submit player type data for a user
   */
  static async submitPlayerTypeData(userId: string | number, data: any): Promise<any> {
    try {
      console.log(`Submitting player type data for user ID: ${userId}`, data);
      const response = await makeAuthenticatedRequest(
        PLAYER_TYPE_ENDPOINTS.SUBMIT_DATA(userId),
        'post',
        data
      );
      return response.data;
    } catch (error) {
      console.error(`Error submitting player type data for user ${userId}:`, error);
      throw error;
    }
  }
}
