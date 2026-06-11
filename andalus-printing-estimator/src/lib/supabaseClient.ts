// Mock Supabase client - no real backend
export const supabase = {
  auth: {
    getSession: async () => ({
      data: {
        session: {
          user: { id: '1', email: 'user@example.com' }
        }
      },
      error: null
    }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (_event: string, callback: Function) => {
      callback(null, { user: { id: '1', email: 'user@example.com' } });
      return {
        data: {
          subscription: { unsubscribe: () => {} }
        }
      };
    }
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      order: (column?: string, opts?: any) => ({
        then: (callback: Function) => {
          callback({ data: [], error: null });
        }
      }),
      single: () => ({
        then: (callback: Function) => {
          callback({ data: {}, error: null });
        }
      }),
      eq: (column: string, value: any) => ({
        then: (callback: Function) => {
          callback({ data: [], error: null });
        }
      }),
      in: (column: string, values: any[]) => ({
        order: (col?: string) => ({
          then: (callback: Function) => {
            callback({ data: [], error: null });
          }
        })
      }),
      then: (callback: Function) => {
        callback({ data: [], error: null });
      }
    }),
    insert: (data: any) => ({
      select: () => ({
        then: (callback: Function) => {
          callback({ data: [{ id: '1', ...data }], error: null });
        }
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        then: (callback: Function) => {
          callback({ data: [data], error: null });
        }
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        then: (callback: Function) => {
          callback({ data: null, error: null });
        }
      })
    }),
    count: () => ({
      then: (callback: Function) => {
        callback({ count: 0, error: null });
      }
    })
  })
};