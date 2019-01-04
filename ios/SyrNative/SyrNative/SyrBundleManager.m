//
//  SyrBundleManager.m
//  SyrNative
//
//  Created by Anderson,Derek on 12/14/17.
//  Copyright © 2017 Anderson,Derek. All rights reserved.
//

#import "SyrBundleManager.h"

@implementation SyrBundle

@end

@implementation SyrBundleManager

- (id) init
{
    self = [super init];
    if (self!=nil) {
        
    }
    return self;
}

- (id) initWithServerPath:(NSString*) serverPath {
    self = [super init];
    if (self)
    {
        self.manfestServerEndpoint = serverPath;
    }
    return self;
}

-(SyrBundle*) loadBundle:(NSString*) bundlePath {
    SyrBundle* bundle = [[SyrBundle alloc] init];
    return bundle;
}

-(void) getManifest:(NSString*) manifestPath {
    
}

@end
