//
//  SyrBundleManager.h
//  SyrNative
//
//  Created by Anderson,Derek on 12/14/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SyrBundle : NSObject

@end

@interface SyrBundleManager : NSObject
@property NSString* manfestServerEndpoint;

- (id) initWithServerPath:(NSString*) serverPath;
- (SyrBundle*) loadBundle:(NSString*) bundlePath;

@end



